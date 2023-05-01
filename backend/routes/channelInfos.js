// routes/channelinfos.js
const express = require('express');
const router = express.Router();
const db = require('../services/sequelize');// Importez le modèle User
const { Op } = require('sequelize');

router.get('/user/:identifier', async (req, res) => {
  try {
    const userIdentifier = req.params.identifier;
    const user = await db.User.findOne({
      where: { identifier: userIdentifier },
      attributes: ['id', 'identifier', 'name', 'description', 'avatar', 'createdAt']
    });

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    const subCount = await user.getSubCount()

    const videoCount = await db.Video.count(
      {
        where: {
          user_id: user.id
        },
      }
    );

    let videos = await db.Video.findAll(
      {
        where: {
          user_id: user.id
        },
        attributes: ['id', 'title', 'description', 'views', 'thumbnail', 'length', 'uploaded_at', 'identifier', 'upvote', 'downvote'],
        order: [['uploaded_at', 'DESC']]
      }
    );

    let videosfinal = {};
    let videos_informations = {};

    videos.map(async (video) => {
      video.commentsCount = await db.Comments.count(
        {
          where: {
            video_id: video.id
          },
        }
      );
      videos_informations = {
        video.title,
        video.description,
        video.views,
        video.thumbnail,
        video.length,
        video.uploaded_at,
        video.identifier,
        video.upvote,
        video.downvote,
        video.commentsCount
      }
      videosfinal.push(videos_informations)
    });

    const VueCount = await db.Video.sum('views', {
      where: {
        user_id: user.id
      }
    });

    if (user) {
      const user_informations = {
        identifier: user.identifier,
        name: user.name,
        description: user.description,
      }

      res.json({
        user: {
          ...user_informations,
          subCount,
          videoCount,
          videos,
          VueCount
        }
      });

    } else {
      res.status(404).send('Utilisateur non trouvé');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Erreur lors de la récupération de l\'utilisateur');
  }
});

module.exports = router;
