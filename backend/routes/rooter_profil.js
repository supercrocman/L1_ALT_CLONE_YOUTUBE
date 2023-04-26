// page de router pour la connexion
const express = require('express');

const router = express.Router(); // Créer un routeur Express

const login = require('../middlewares/loginmiddleware'); // Importer le middleware de connexion

// GET route pour afficher le formulaire de connexion
router.get('/login', (req, res) => {
    res.render('login'); // render login.ejs
});

// POST route pour traiter les données de connexion
router.post('/login', login);

// Effectuer une requête POST pour vérifier l'authentification

module.exports = router; // Exporter le routeur
