/* eslint-disable no-console */
/* eslint-disable consistent-return */
require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(
                token,
                process.env.SECRET_KEY_ACCESS,
                async (err, decodedToken) => {
                    if (err) {
                        if (err.name === 'TokenExpiredError') {
                            return res.status(401).json({
                                message: "Token d'accès expiré",
                                error: 'refresh',
                            });
                        }
                        return res.status(401).json({
                            message: "Token d'accès invalide ou expiré",
                        });
                    }
                    const { identifier } = decodedToken;
                    req.auth = {
                        identifier,
                    };
                    next();
                }
            );
        } else {
            return res.status(401).json({
                message: "Token d'accès invalide ou expiré",
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Problème serveur' });
    }
};
