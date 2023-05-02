const express = require('express');
const router = express.Router();
const db = require('../services/sequelize');
const { Op } = require('sequelize');

router.post('/timeline', async (req, res) => {
    if(!req.body.user) {
        //case where user is not logged in
        res.send("User not logged in");
    }
    const user = await db.User.findOne({
        where: {
            id: req.body.user,
        },
    });
    res.send(await user.getPreferredTags());
});

module.exports = router;
