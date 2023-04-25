const express = require('express');
const router = express.Router();
const db = require('../services/sequelize');
const { Op } = require('sequelize');


router.post('/search', async (req, res) => {
    if(req.body.q === undefined) return res.status(400).send('No query provided');
    if(req.body.q.length < 3) return res.status(400).send('Query too short');
    try {
        const videos = await db.Video.findAll({
          where: {
            searchable_title: {
              [Op.substring]: req.body.q,
            }
          }
        });
        const titleList = videos.map((video) => video.title);
        res.json(titleList);
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
      }
});

module.exports = router;