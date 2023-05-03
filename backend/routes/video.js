// routes/channelinfos.js
const express = require('express');
const { Sequelize } = require('sequelize');
const db = require('../services/sequelize'); // Importez le modèle User

const router = express.Router();

router.get('/video/:identifier', async (req, res) => {
    try {
        const videoIdentifier = req.params.identifier;
        const video = await db.Video.findOne({
            where: { identifier: videoIdentifier },
            attributes: [
                'title',
                'description',
                'views',
                'thumbnail',
                'length',
                'path',
                'uploaded_at',
                'identifier',
                'upvote',
            ],
            include: [
                {
                    model: db.User,
                    as: 'author',
                    attributes: [
                        'id',
                        'name',
                        'identifier',
                        'avatar',
                        'description',
                    ],
                },
            ],
        });

        if (!video) {
            res.status(404).send('Video not found');
            return;
        }

        video.author.dataValues.subCount = await video.author.getSubCount();
        delete video.author.dataValues.id;
        // do not send related videos

        res.json(video);
        return;
    } catch (error) {
        console.log(error);
        res.status(500).send('Erreur lors de la récupération de la video');
    }
});

router.get('/video/:identifier/related', async (req, res) => {
    try {
        const videos = await db.Video.findAll({
            order: Sequelize.literal('rand()'),
            limit: 20,
            attributes: [
                'title',
                'description',
                'views',
                'thumbnail',
                'length',
                'uploaded_at',
                'identifier',
            ],
            include: [
                {
                    model: db.User,
                    as: 'author',
                    attributes: ['name', 'identifier', 'avatar', 'description'],
                },
            ],
        });
        res.json(videos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Erreur lors de la récupération des videos');
    }
});

module.exports = router;
