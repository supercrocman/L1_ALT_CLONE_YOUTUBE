const express = require('express');
const router = express.Router();
const db = require('../services/sequelize');
const { Op } = require('sequelize');
const { body, validationResult } = require('express-validator');

router.post('/search',
 body('q').trim()
 .notEmpty().withMessage('No query provided')
 .isLength({ min: 3}).withMessage('Query too short')
 , async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    try {
        const channels = await db.User.findAll({
            where: {
                name: {
                    [Op.substring]: req.body.q,
                }
            }
        });
        const videos = await db.Video.findAll({
        limit : 10,
        order : [['views', 'DESC']],
          where: {
            searchable_title: {
              [Op.substring]: req.body.q,
            }
          }
        });
        const topChannel = await getTopChannel(channels);
        const topChannelName = topChannel ? topChannel.name : null;
        const titleList = videos.map((video) => video.title);
        res.json({topChannelName, videos: titleList });
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
      }
});

async function getTopChannel(channels) {
    let topChannel = null;
    let topSubCount = -1;
    for (let i = 0; i < channels.length; i++) {
        const channel = channels[i];
        const subCount = await channel.getSubCount();
        if (subCount > topSubCount) {
            topSubCount = subCount;
            topChannel = channel;
        }
    }
    return topChannel;
}

module.exports = router;
