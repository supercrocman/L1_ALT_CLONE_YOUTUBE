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
                process.env.SECRET_KEY_ACCESS,
                { expiresIn: '7d' }
            );
            const identifier = `${req.body.name
                .split(' ')
                .join('_')}${valueArray}`;

            await User.create({
                ...req.body,
                identifier,
                password: hash,
                avatar: req.file
                    ? `${req.protocol}://${req.get('host')}/src/avatar/${
                          req.file.filename
                      }`
                    : null,
                email_confirmation_token: token,
            });
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
                        return res.status(200).json({
                            message:
                                "L'utilisateur a été créé. Allez vérifier vos e-mails.",
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
        const refreshTokenCookieOptions = {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: '/',
        };
        const user = await User.findOne({ where: { email: userMail } });
        if (!user) {
            return res.status(401).json({
                message: 'Identifiants invalides, veuillez réessayer',
            });
        }
        if (!user.verified) {
            return res
                .status(401)
                .json({ message: "Le compte n'a pas été activée" });
        }
        // eslint-disable-next-line consistent-return
        bcrypt
            .compare(userPassword, user.password)
            .then(async (result, err) => {
                if (err || !result) {
                    console.log('mot');
                    return res.status(401).json({
                        message: 'Identifiants invalides, veuillez réessayer',
                    });
                }
                const accessToken = jwt.sign(
                    { identifier: user.identifier },
                    process.env.SECRET_KEY_ACCESS,
                    { expiresIn: '25m' }
                );
                if (remember) {
                    const refreshToken = jwt.sign(
                        { identifier: user.identifier },
                        process.env.SECRET_KEY_REFRESH,
                        { expiresIn: 30 * 24 * 60 * 60 * 1000 }
                    );
                    res.cookie(
                        'refreshToken',
                        refreshToken,
                        refreshTokenCookieOptions
                    );
                }
                res.cookie('AccessToken', accessToken, {
                    path: '/',
                    expiresIn: 30 * 24 * 60 * 60 * 1000,
                });
                return res.status(200).json({
                    avatar: user.avatar,
                    pseudo: user.name,
                });
            });
    } catch (error) {
        return res.status(500).json({
            message: 'Problème de connexion, veuillez réessayer plus tard',
        });
    }
};

exports.refresh = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return res.status(401).json({
                message: 'Refresh token invalide ou expiré',
                error: 'reconnexion',
            });
        }
        const decodedToken = jwt.verify(
            refreshToken,
            process.env.SECRET_KEY_REFRESH
        );
        const { identifier } = decodedToken;
        const user = await User.findOne({
            attibutes: ['password_reminder_token'],
            where: { identifier },
        });
        if (!user) {
            res.clearCookie('refreshToken');
            return res.status(401).json({ message: 'Token mauvais' });
        }
        const accessToken = jwt.sign(
            { identifier },
            process.env.SECRET_KEY_ACCESS,
            {
                expiresIn: '25m',
            }
        );
        res.cookie('AccessToken', accessToken, {
            path: '/',
            expiresIn: 30 * 24 * 60 * 60 * 1000,
        });
        return res.sendStatus(201);
    } catch (error) {
        res.clearCookie('refreshToken');
        return res.status(401).json({
            message: 'Refresh token invalide ou expiré',
            error: 'reconnexion',
        });
    }
};

exports.logout = (req, res) => {
    try {
        res.clearCookie('refreshToken');
        res.clearCookie('user');
        res.clearCookie('AccessToken');
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
};
exports.dataUser = async (req, res) => {
    try {
        const user = await User.findOne({
            attributes: ['identifier', 'avatar', 'name'],
            where: { identifier: req.auth.identifier },
        });
        res.status(200).json(user);
    } catch (e) {
        res.status(400).json({
            message: "il y a un problème avec l'utilisateur",
        });
    }
};
