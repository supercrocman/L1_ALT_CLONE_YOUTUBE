const express = require('express');

const { signup } = require('../middlewares/profil');

const router = express.Router();

router.post('/signup', signup);

module.exports = router;
