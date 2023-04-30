const express = require('express');
const multer = require('../middlewares/multer');
const { signup, verifyUser, login } = require('../middlewares/profil');

const router = express.Router();

router.post('/signup', multer, signup);
router.get('/verify/:confirmationCode', verifyUser);
router.post('/login', login);
module.exports = router;
