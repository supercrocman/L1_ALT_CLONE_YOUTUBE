/* eslint-disable no-console */
const bcrypt = require('bcrypt');

const crypto = require('crypto');

const db = require('../services/sequelize');

const { User } = db;

exports.signup = (req, res) => {
    console.log(req.body);
    delete req.body.image;
    const saltRound = 10;
    const array = new Uint32Array(5);
    const valueArray = crypto
        .getRandomValues(array)
        .toString()
        .split(',')
        .join('');
    const identifier = `@${req.body.name}${valueArray}`;
    bcrypt.hash(req.body.password, saltRound).then(async (hash) => {
        try {
            const userCreated = await User.create({
                ...req.body,
                identifier,
                password: hash,
            });
            console.log('lala', userCreated.toJSON());

            res.status(201).json({ message: 'Utilisateur crée' });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    });
};
