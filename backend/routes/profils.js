const express = require('express');
const { auth } = require('../middlewares/auth');
const multer = require('../middlewares/multer');
const {
    signup,
    verifyUser,
    login,
    refresh,
    logout,
    dataUser,
} = require('../middlewares/profil');

const router = express.Router();

router.post('/signup', multer, signup);
router.get('/verify/:confirmationCode', verifyUser);
router.post('/login', login);
router.post('/refresh', refresh);
router.get('/user', auth, dataUser);
router.get('/logout', auth, logout);

module.exports = router;
