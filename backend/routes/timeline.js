const express = require('express');
const router = express.Router();
const db = require('../services/sequelize');
const { Op } = require('sequelize');

router.post('/timeline', async (req, res) => {
    if(!req.body.user) {
        return res.status(400).send('No user provided');
    }
    res.send('ok user id : ' + req.body.user);
});

module.exports = router;
