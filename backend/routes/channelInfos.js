// routes/channelinfos.js
const express = require('express');
const db = require('../services/sequelize'); // Importez le modèle User

const router = express.Router();

router.get('/user/:identifier', async (req, res) => {
    try {
        const userIdentifier = req.params.identifier;
        const user = await db.User.findOne({
            where: { identifier: userIdentifier },
            attributes: ['id', 'identifier', 'name', 'description'],
        });

        if (!user) {
            res.status(404).send('User not found');
            return;
        }

        const subCount = await user.getSubCount();

        const videoCount = await db.Video.count({
            where: {
                user_id: user.id,
            },
        });

        const videos = await db.Video.findAll({
            where: {
                user_id: user.id,
            },
            attributes: [
                'title',
                'description',
                'views',
                'thumbnail',
                'length',
                'uploaded_at',
                'identifier',
            ],
            order: [['uploaded_at', 'DESC']],
        });

        if (user) {
            const userInformations = {
                identifier: user.identifier,
                name: user.name,
                description: user.description,
            };

            res.json({
                user: {
                    ...userInformations,
                    subCount,
                    videoCount,
                    videos,
                },
            });
        } else {
            res.status(404).send('Utilisateur non trouvé');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Erreur lors de la récupération de l'utilisateur");
    }
});

module.exports = router;
