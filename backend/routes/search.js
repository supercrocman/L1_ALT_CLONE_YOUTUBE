const express = require('express');
const router = express.Router();
const db = require('../services/sequelize');
const { Op } = require('sequelize');
const { body, validationResult } = require('express-validator');

router.post(
    '/search',
    body('q')
        .trim()
        .notEmpty()
        .withMessage('No query provided')
        .isLength({ min: 3 })
        .withMessage('Query too short'),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        try {
            const channels = await db.User.findAll({
                where: {
                    name: {
                        [Op.substring]: req.body.q,
                    },
                },
            });
            const videos = await db.Video.findAll({
                limit: 10,
                order: [['views', 'DESC']],
                where: {
                    searchable_title: {
                        [Op.substring]: req.body.q,
                    },
                },
            });
            const topChannel = await getTopChannel(channels);
            const topChannelName = topChannel ? topChannel.name : null;
            const titleList = videos.map((video) => video.title);
            res.json({ topChannelName, videos: titleList });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }
);

router.get('/submit-search',
 body('q').trim()
 .notEmpty().withMessage('No query provided')
 , async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    try {
        // renvoyer top sub user, 2 most recent vids, up to 10 results from title , up to  10 results from tags
        const channels = await db.User.findAll({
            attributes: [
                'id',
                'identifier',
                'name',
                'description',
                'avatar',
              ],
            where: {
                name: {
                    [Op.substring]: req.body.q,
                }
            }
        });
        const topChannel = await getTopChannel(channels);
        const topChannelVideos = await getRecentVideo(topChannel, 2);
        const videos = await db.Video.findAll({
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
        limit : 10,
        order : [['views', 'DESC']],
          where: {
            searchable_title: {
              [Op.substring]: req.body.q,
            },
            id: {
                [Op.notIn]: topChannelVideos.map(video => video.id)
            }
          }
        });
        const videos_tags = await db.Video.findAll({
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
            limit : 10,
            order : [['views', 'DESC']],
            include: [
                {
                  model: db.Tag,
                  where: {
                    name: {
                      [Op.substring]: req.body.q
                    }
                  },
                  through: {
                    model: db.VideoTag,
                    where: {
                        video_id: {
                            [Op.notIn]: videos.map(video => video.id)
                        }
                    }
                  }
                }
              ]
            });
        const videos_result = videos.concat(videos_tags);

        let authors = new Map();
        topChannel.dataValues.subCount = await topChannel.getSubCount();
        authors.set(topChannel.id, topChannel);
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
            const author = authors.find(author => author.id === author_id);
            video.dataValues.author = author.identifier;
        }
        for (let i = 0; i < topChannelVideos.length; i++) {
            const video = topChannelVideos[i];
            const author_id = topChannel.id;
            const author = authors.find(author => author.id === author_id);
            video.dataValues.author = author.identifier;
        }

        const videos_found = videos_result.map((video) => {
            const { id, user_id, ...video_without_id } = video.dataValues;
            return video_without_id;
        });

        const topChannelVideos_found = topChannelVideos.map((video) => {
            const { id, user_id, ...video_without_id } = video.dataValues;
            return video_without_id;
        });
        
        const authors_found = authors.map((author) => {
            const { id, ...author_without_id } = author.dataValues;
            return author_without_id;
        });

        const data = { authors_found, topChannelVideos_found, videos_found };
        res.json(data);
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
      }
});

async function getTopChannel(channels) {
    let topChannel = null;
    let topSubCount = -1;
    for (let i = 0; i < channels.length; i++) {
        const channel = channels[i];
        const subCount = await channel.getSubCount();
        if (subCount > topSubCount) {
            topSubCount = subCount;
            topChannel = channel;
        }
    }
    return topChannel;
}

async function getRecentVideo(channel, amount) {
    const videos = await channel.getVideos({
        limit: amount,
        order: [['uploaded_at', 'DESC']],
    });
    return videos;
}

module.exports = router;
