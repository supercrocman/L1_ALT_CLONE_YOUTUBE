
const express = require('express');
const db = require('../services/sequelize'); // Importez le modèle User
const logger = require('../services/winston');

const router = express.Router();

router.get('/viewing/:identifier', async (req, res) => {
    const videoIdentifier = req.params.identifier;
    const duration = req.query.duration;
    const video = await db.Video.findOne({
        where: {
            identifier: videoIdentifier,
        },
    });

    if (!video) {
        res.status(404).send('Video not found');
        return;
    }

    const view = await db.View.create({
        video_id: video.id,
        duration: duration,
    });

    res.status(200).send('View added');
}