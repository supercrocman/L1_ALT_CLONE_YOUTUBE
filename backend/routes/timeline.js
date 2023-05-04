const express = require('express');
const router = express.Router();
const db = require('../services/sequelize');
const { Op } = require('sequelize');
const logger = require('../services/winston');

router.post('/timeline', async (req, res) => {
    try {
        if (!req.body.user) {
            // case where user is not logged in
            const defaultvids = await defaultTimeline();
            return res.send({ defaultvids });
        }
        const user = await db.User.findOne({
            where: {
                id: req.body.user,
            },
        });
        if (!user) {
            const defaultvids = await defaultTimeline();
            return res.send({ defaultvids });
        }
        // case where user is logged in
        let fav_tags = await user.getPreferredTags();
        fav_tags = Object.keys(fav_tags).slice(0, 3);
        if (fav_tags.length === 0) {
            const defaultvids = await defaultTimeline();
            return res.send({ defaultvids });
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
        const videos_result = videos_result_tags
            .sort(() => Math.random() - 0.5)
            .slice(0, 12);
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
    const exclude_ids = videos_result.map((video) => video.id);
    const defaultvids = await defaultTimeline(exclude_ids);

        authors = Array.from(authors.values());

        for (let i = 0; i < videos_result.length; i++) {
            const video = videos_result[i];
            const author_id = video.user_id;
            const author = authors.find((author) => author.id === author_id);
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

        return res.send({
            defaultvids,
            videos_reco: videos_found,
            authors_reco: authors_found,
            user_reco: true,
        });
    
    return res.send({defaultvids, videos_reco: videos_found, authors_reco: authors_found, user_reco:true});
    } catch (error) {
        logger.error(error);
        return res.status(500).send('Server error');
    }
});

module.exports = router;

async function getRecentPopularVideos(max, exclude=[]){
    const videos = await db.Video.findAll({
        where: {
            uploaded_at: {
                [Op.gte]: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
            },
            id: {
                [Op.notIn]: exclude,
            },
        },
        limit: max,
        order: [['views', 'DESC']],
    });
    if (videos.length < max) {
        const videos2 = await db.Video.findAll({
            where: {
                uploaded_at: {
                    [Op.gte]: new Date(new Date() - 30 * 60 * 60 * 24 * 1000),
                },
                id: {
                    [Op.notIn]: exclude,
                },
            },
            limit: max - videos.length,
            order: [['views', 'DESC']],
        });
        videos.push(...videos2);
    }
    if (videos.length < max) {
        const videos3 = await db.Video.findAll({
            where: {
                uploaded_at: {
                    [Op.gte]: new Date(new Date() - 365 * 60 * 60 * 24 * 1000),
                },
                id: {
                    [Op.notIn]: exclude,
                },
            },
            limit: max - videos.length,
            order: [['views', 'DESC']],
        });
        videos.push(...videos3);
    }
    if (videos.length < max) {
        const videos4 = await db.Video.findAll({
            where:{
                id: {
                    [Op.notIn]: exclude,
                },
            },
            limit: max - videos.length,
            order: [['views', 'DESC']],
        });
        videos.push(...videos4);
    }
    return videos;
}

async function defaultTimeline(exclude =[], amount = 12){
    const popVideos = await getRecentPopularVideos(50, exclude);
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
        const author = authors.find((author) => author.id === author_id);
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

    return { videos: videos_found, authors: authors_found };
}
