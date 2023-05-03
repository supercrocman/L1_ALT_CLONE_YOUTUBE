const express = require('express');
const router = express.Router();
const db = require('../services/sequelize');
const { Op } = require('sequelize');

router.post('/timeline', async (req, res) => {
    try{
    if(!req.body.user) {
        // case where user is not logged in
        return res.send(await defaultTimeline());
    }
    const user = await db.User.findOne({
        where: {
            id: req.body.user,
        },
    });
    if(!user) {
        return res.send(await defaultTimeline());
    }
    // case where user is logged in
    let fav_tags = await user.getPreferredTags();
    fav_tags = Object.keys(fav_tags).slice(0, 3);
    if (fav_tags.length === 0) {
        return res.send(await defaultTimeline());
    }
    const videos_result_tags = await db.Video.findAll({
        attributes: [
            'id',
            'user_id',
            'identifier',
            'uploaded_at',
            'thumbnail',
            'title',
            'description',
            'views',
            'length',
        ],
        include: [
            {
                model: db.Tag,
                where: {
                    name: {
                        [Op.in]: fav_tags,
                    },
                },
                through: {
                    model: db.VideoTag,
                },
            },
        ],
        limit: 50,
        order: [['views', 'DESC']],
    });
    const videos_result = videos_result_tags.sort(() => Math.random() - 0.5).slice(0, 12);
    let authors = new Map();
    for (let i = 0; i < videos_result.length; i++) {
        const video = videos_result[i];
        const author_id = video.user_id;
        if (authors.has(author_id)) {
            continue;
        }
        const author = await video.getAuthor();
        const subCount = await author.getSubCount();
        author.dataValues.subCount = subCount;
        authors.set(author_id, author);
    }
    

    authors = Array.from(authors.values());

    for (let i = 0; i < videos_result.length; i++) {
        const video = videos_result[i];
        const author_id = video.user_id;
        const author = authors.find(
            (author) => author.id === author_id
        );
        video.dataValues.author = author.identifier;
    }
    
    const videos_found = videos_result.map((video) => {
        const { id, user_id, User_id, tags, ...video_without_id } =
            video.dataValues;
        return video_without_id;
    });

    const authors_found = authors.map((author) => {
        const { id, ...author_without_id } = author.dataValues;
        return author_without_id;
    });
    if(videos_found.length < 12) {
        const videos = await getRecentPopularVideos(12 - videos_found.length);
        const videos_add = videos.sort(() => Math.random() - 0.5);

        let authors_add = new Map();
    for (let i = 0; i < videos_add.length; i++) {
        const video = videos_add[i];
        const author_id = video.user_id;
        if (authors_add.has(author_id)) {
            continue;
        }
        const author = await video.getAuthor();
        const subCount = await author.getSubCount();
        author.dataValues.subCount = subCount;
        authors_add.set(author_id, author);
    }
    authors_add = Array.from(authors_add.values());
    for (let i = 0; i < videos_add.length; i++) {
        const video = videos_add[i];
        const author_id = video.user_id;
        const author = authors_add.find(
            (author) => author.id === author_id
        );
        video.dataValues.author = author.identifier;
    }
    const videos_add_found = videos_add.map((video) => {
        const { id, user_id, User_id, tags, ...video_without_id } =
            video.dataValues;
        return video_without_id;
    });

    const authors_add_found = authors_add.map((author) => {
        const { id, ...author_without_id } = author.dataValues;
        return author_without_id;
    });
        videos_found.push(...videos_add_found);
        authors_found.push(...authors_add_found);
    }
    return res.send({ videos: videos_found, authors: authors_found, user_reco: true });
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
});

module.exports = router;

async function getRecentPopularVideos(max){
    const videos = await db.Video.findAll({
        where: {
            uploaded_at: {
                [Op.gte]: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
            },
        },
        limit: max,
        order: [['views', 'DESC']],
    });
    return videos;
}

async function defaultTimeline(amount = 12){
    const popVideos = await getRecentPopularVideos(50);
    const videos_result = popVideos.sort(() => Math.random() - 0.5).slice(0, amount);
        let authors = new Map();
            for (let i = 0; i < videos_result.length; i++) {
                const video = videos_result[i];
                const author_id = video.user_id;
                if (authors.has(author_id)) {
                    continue;
                }
                const author = await video.getAuthor();
                const subCount = await author.getSubCount();
                author.dataValues.subCount = subCount;
                authors.set(author_id, author);
            }
            

            authors = Array.from(authors.values());

            for (let i = 0; i < videos_result.length; i++) {
                const video = videos_result[i];
                const author_id = video.user_id;
                const author = authors.find(
                    (author) => author.id === author_id
                );
                video.dataValues.author = author.identifier;
            }
            
            const videos_found = videos_result.map((video) => {
                const { id, user_id, User_id, tags, ...video_without_id } =
                    video.dataValues;
                return video_without_id;
            });

            const authors_found = authors.map((author) => {
                const { id, ...author_without_id } = author.dataValues;
                return author_without_id;
            });

            return {videos: videos_found, authors: authors_found};
}