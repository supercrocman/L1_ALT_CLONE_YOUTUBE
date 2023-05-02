/* eslint-disable consistent-return */
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
                process.env.SECRET_KEY_ACCESS
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

exports.login = async (req, res) => {
    try {
        const { userMail, userPassword, remember } = req.body;
        const user = await User.findOne({ where: { email: userMail } });
        if (!user) {
            return res
                .status(401)
                .json({ message: 'Email ou mot de passe incorrect.' });
        }
        if (user.verified === 0) {
            return res
                .status(401)
                .json({ message: "Le compte n'a pas été activée" });
        }

        // eslint-disable-next-line consistent-return
        bcrypt
            .compare(userPassword, user.password)
            .then(async (result, err) => {
                if (err || !result) {
                    return res
                        .status(401)
                        .json({ message: 'Email ou mot de passe incorrect.' });
                }
                const accessToken = jwt.sign(
                    { identifier: user.identifier },
                    process.env.SECRET_KEY_ACCESS,
                    { expiresIn: 4 }
                );
                if (remember) {
                    const refreshToken = jwt.sign(
                        { identifier: user.identifier },
                        process.env.SECRET_KEY_REFRESH,
                        { expiresIn: '7d' }
                    );
                    const expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + 7);
                    await User.update(
                        {
                            password_reminder_token: refreshToken,
                            password_reminder_expire: expirationDate,
                        },
                        {
                            where: {
                                email: userMail,
                            },
                        }
                    );
                } else {
                    await User.update(
                        {
                            password_reminder_token: null,
                            password_reminder_expire: null,
                        },
                        {
                            where: {
                                email: userMail,
                            },
                        }
                    );
                }

                return res.status(200).json({
                    accessToken,
                    avatar: user.avatar,
                    identifier: user.identifier,
                    pseudo: user.name,
                    userId: user.id,
                });
            });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.refresh = async (req, res) => {
    try {
        const { userIdentifier } = req.body;
        const user = await User.findOne({
            attibutes: ['password_reminder_token'],
            where: { identifier: userIdentifier },
        });
        if (!user) {
            return res.status(401).json({ message: 'Identifiant mauvais' });
        }
        jwt.verify(
            user.password_reminder_token,
            process.env.SECRET_KEY_REFRESH,
            (err, decodedToken) => {
                if (err) {
                    console.log(err);
                    return res
                        .status(401)
                        .json({ message: 'Refresh token invalide ou expiré' });
                }
                const { identifier } = decodedToken;
                const accessToken = jwt.sign(
                    { identifier },
                    process.env.SECRET_KEY_ACCESS,
                    {
                        expiresIn: 4,
                    }
                );
                return res.status(201).json({ accessToken });
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(401).json({ message: 'Problème de connexion' });
    }
};
