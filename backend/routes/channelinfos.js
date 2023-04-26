// routes/channelinfos.js
const express = require('express');
const router = express.Router();
const db = require('../services/sequelize');
const User = require('../models/user'); // Importez le modèle User

router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'identifier', 'name', 'verified', 'description']
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des utilisateurs');
  }
});

module.exports = router;
