// routes/channelinfos.js
const express = require('express');
const db = require('../services/sequelize'); // Importez le modèle User

const router = express.Router();

router.get('/user/:identifier', async (req, res) => {
    try {
        const userIdentifier = req.params.identifier;
        const user = await db.User.findOne({
            where: { identifier: userIdentifier },
            attributes: [
                'id',
                'identifier',
                'name',
                'description',
                'avatar',
                'createdAt',
            ],
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

        let videos = await db.Video.findAll({
            where: {
                user_id: user.id,
            },
            attributes: [
                'id',
                'title',
                'description',
                'views',
                'thumbnail',
                'length',
                'uploaded_at',
                'identifier',
                'upvote',
                'downvote',
            ],
            order: [['uploaded_at', 'DESC']],
        });

        for (let i = 0; i < videos.length; i++) {
            const video = videos[i];
            const commentCount = await video.getCommentCount();
            video.dataValues.commentCount = commentCount;
            delete video.dataValues.id;
        }

        const VueCount = await db.Video.sum('views', {
            where: {
                user_id: user.id,
            },
        });

        if (user) {
            delete user.dataValues.id;

            const user_informations = {
                identifier: user.identifier,
                name: user.name,
                description: user.description,
            };

            res.json({
                user: {
                    ...user.dataValues,
                    subCount,
                    videoCount,
                    videos,
                    VueCount,
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
