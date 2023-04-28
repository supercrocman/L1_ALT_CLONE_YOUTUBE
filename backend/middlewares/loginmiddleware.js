const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { User } = require('../services/sequelize');
// Rechercher l'utilisateur dans la base de données

// eslint-disable-next-line consistent-return
async function login(req, res) {
    try {
        const { userMail, userPassword } = req.body; // Récupérer l'email et le mot de passe depuis le corps de la requête

        // 2. Rechercher l'utilisateur correspondant à l'email dans la base de données
        const user = await User.findOne({ where: { email: userMail } });

        // 3. Vérifier si l'utilisateur existe et si le mot de passe est correct
        if (!user) {
            // Si le mot de passe est incorrect ou si l'utilisateur n'existe pas,
            return res
                .status(401)
                .json({ message: 'Email ou mot de passe incorrect.' });
            // renvoyer une erreur 401 (Unauthorized)
        }

        // eslint-disable-next-line consistent-return
        bcrypt.compare(userPassword, user.password).then((result, err) => {
            if (err || !result) {
                return res
                    .status(401)
                    .json({ message: 'Email ou mot de passe incorrect.' });
            }
            const buf = crypto.randomBytes(8);
            const hex = buf.toString('hex');
            const secretkey = parseInt(hex, 16);

            const token = jwt.sign(
                { identifier: user.identifier },
                secretkey.toString()
            );

            return res.status(200).json({
                // Si le mot de passe est correct, créer un token pour l'utilisateur
                token,
                avatar: user.avatar,
                identifier: user.identifier,
                pseudo: user.name,
                userId: user.id,
            });
        });

        // 4. Si le mot de passe est correct, créer un token pour l'utilisateur

        // 5. Renvoyer le token, l'avatar et l'identifiant de l'utilisateur au front-end

        // Récupérer les informations de connexion depuis la requête
    } catch (error) {
        return res.status(500).json({ message: 'Erreur serveur' });
    }
}

module.exports = login;
