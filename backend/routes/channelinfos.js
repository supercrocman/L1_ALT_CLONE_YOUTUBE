// routes/channelinfos.js
const express = require('express');
const router = express.Router();
const db = require('../services/sequelize');// Importez le modèle User
const { Op } = require('sequelize');


router.get('/users', async (req, res) => {
  // if (req.body.q === undefined) return res.status(400).send('No query provided');
  // if (req.body.q.length < 3) return res.status(400).send('Query too short');
const identifier = req.headers.identifier;
  try {
    const users = await db.User.findAll({
      attributes: ['id', 'identifier', 'name', 'verified', 'description'],
      where: {
        identifier: identifier
      }
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des utilisateurs');
  }
});

router.get('/user/:identifier', async (req, res) => {
  try {
    const userIdentifier = req.params.identifier;
    const user = await db.User.findOne({
      where: { identifier: userIdentifier },
      attributes: ['id', 'identifier', 'name', 'verified', 'description']
    });

    // const subCount = await db.UserSubscription.findAll(
    //   {
    //     where: {
    //       user_id: user.id
    //     },
    //     attributes: [[db.sequelize.fn('COUNT', db.sequelize.col('user_id')), 'subCount']]
    //   }
    // );

    const subCount = user.getSubscriptions()

    const videoCount = await db.Video.findAll(
      {
        where: {
          user_id: user.id
        },
        attributes: [[db.sequelize.fn('COUNT', db.sequelize.col('user_id')), 'videoCount']]
      }
    );

    const videos = await db.Video.findAll(
      {
        where: {
          user_id: user.id
        },
        attributes: ['title', 'description', 'views', 'thumbnail', 'length', 'uploaded_at', 'identifier'],
        order: [['uploaded_at', 'DESC']]
      }
    );

    if (user) {
      res.json({user, subCount, videoCount, videos});

    } else {
      res.status(404).send('Utilisateur non trouvé');
    }
  } catch (error) {
    // res.status(500).send(error);
    res.status(500).send('Erreur lors de la récupération de l\'utilisateur');
  }
});

module.exports = router;
