const express = require('express');
const multer = require('../middlewares/multer');

const { signup, verifyUser } = require('../middlewares/profil');

const router = express.Router();

router.post('/signup', multer, signup);
router.get('/verify/:confirmationCode', verifyUser);

module.exports = router;
