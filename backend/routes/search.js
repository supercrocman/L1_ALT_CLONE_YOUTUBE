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