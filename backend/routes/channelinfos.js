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
        identifier: {
          [Op.substring]: identifier,
        }
      }
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des utilisateurs');
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({
      where: { id: userId },
      attributes: ['id', 'identifier', 'name', 'verified', 'description']
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).send('Utilisateur non trouvé');
    }
  } catch (error) {
    // res.status(500).send(error);
    res.status(500).send('Erreur lors de la récupération de l\'utilisateur');
  }
});

module.exports = router;
