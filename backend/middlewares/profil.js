/* eslint-disable no-console */
require('dotenv').config();
const bcrypt = require('bcrypt');

const crypto = require('crypto');

const nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken');

const db = require('../services/sequelize');

const { User } = db;

exports.signup = (req, res) => {
    const saltRound = 10;
    bcrypt.hash(req.body.password, saltRound).then(async (hash) => {
        try {
            const buf = crypto.randomBytes(8);
            const hex = buf.toString('hex');
            const valueArray = parseInt(hex, 16);
            const token = jwt.sign(
                { email: req.body.email },
                valueArray.toString()
            );
            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });
            transporter.sendMail(
                {
                    from: process.env.EMAIL_USER,
                    to: req.body.email,
                    subject: 'Please confirm your account',
                    html: `<h1>Email Confirmation</h1>
                        <h2>Bonjour ${req.body.name}</h2>
                        <p>Merci pour votre inscription. Merci de cliquer sur le lien pour confirmer votre email.</p>
                        <a href=http://localhost:3000/confirm/${token}> Click here</a>
                        </div>`,
                },
                // eslint-disable-next-line consistent-return
                async (error, info) => {
                    if (error) {
                        console.log(error);
                        res.status(400).json({ error });
                    } else {
                        console.log(`Email sent: ${info.response}`);
                        const identifier = `${req.body.name
                            .split(' ')
                            .join('_')}${valueArray}`;
                        await User.create({
                            ...req.body,
                            identifier,
                            password: hash,
                            avatar: req.file
                                ? `${req.protocol}://${req.get(
                                      'host'
                                  )}/src/avatar/${req.file.filename}`
                                : null,
                            email_confirmation_token: token,
                        });
                        return res.status(200).json({
                            message:
                                "L'utilisateur a été crée. Aller checker vos mails",
                        });
                    }
                }
            );
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    });
};
exports.verifyUser = async (req, res) => {
    try {
        const userConfirmed = await User.update(
            { verified: 1 },
            {
                where: {
                    email_confirmation_token: req.params.confirmationCode,
                },
            }
        );
        if (!userConfirmed) {
            return res
                .status(404)
                .send({ message: "L'utilisateur n'a pas été trouvé." });
        }
        return res.status(200).send({ message: 'Compte activée' });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: err });
    }
};
