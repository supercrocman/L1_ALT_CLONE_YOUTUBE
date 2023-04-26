const { DataTypes } = require('sequelize');
const comments = require('./comments');
const playlist = require('./playlist');
const playlistVideo = require('./playlistVideo');
const tag = require('./tag');
const user = require('./user');
const userHistory = require('./userHistory');
const userSubscription = require('./userSubscription');
const video = require('./video');
const videoTag = require('./videoTag');

function initModels(sequelize) {
    const Comments = comments(sequelize, DataTypes);
    const Playlist = playlist(sequelize, DataTypes);
    const PlaylistVideo = playlistVideo(sequelize, DataTypes);
    const Tag = tag(sequelize, DataTypes);
    const User = user(sequelize, DataTypes);
    const UserHistory = userHistory(sequelize, DataTypes);
    const UserSubscription = userSubscription(sequelize, DataTypes);
    const Video = video(sequelize, DataTypes);
    const VideoTag = videoTag(sequelize, DataTypes);

    Comments.belongsTo(Comments, {
        as: 'parent_comment',
        foreignKey: 'parent_comment_id',
    });
    Comments.hasMany(Comments, {
        as: 'Comments',
        foreignKey: 'parent_comment_id',
    });
    PlaylistVideo.belongsTo(Playlist, {
        as: 'Playlist',
        foreignKey: 'Playlist_id',
    });
    Playlist.hasMany(PlaylistVideo, {
        as: 'PlaylistVideos',
        foreignKey: 'Playlist_id',
    });
    VideoTag.belongsTo(Tag, { as: 'Tag', foreignKey: 'Tag_id' });
    Tag.hasMany(VideoTag, { as: 'VideoTags', foreignKey: 'Tag_id' });
    Comments.belongsTo(User, { as: 'User', foreignKey: 'User_id' });
    User.hasMany(Comments, { as: 'Comments', foreignKey: 'User_id' });
    Playlist.belongsTo(User, { as: 'User', foreignKey: 'User_id' });
    User.hasMany(Playlist, { as: 'Playlists', foreignKey: 'User_id' });
    UserHistory.belongsTo(User, { as: 'User', foreignKey: 'User_id' });
    User.hasMany(UserHistory, { as: 'User_histories', foreignKey: 'User_id' });
    UserSubscription.belongsTo(User, { as: 'User', foreignKey: 'User_id' });
    User.hasMany(UserSubscription, {
        as: 'UserSubscriptions',
        foreignKey: 'User_id',
    });
    UserSubscription.belongsTo(User, {
        as: 'User_subscribe',
        foreignKey: 'User_subscribe_id',
    });
    User.hasMany(UserSubscription, {
        as: 'User_subscribe_UserSubscriptions',
        foreignKey: 'User_subscribe_id',
    });
    Video.belongsTo(User, { as: 'User', foreignKey: 'User_id' });
    User.hasMany(Video, { as: 'Videos', foreignKey: 'User_id' });
    Comments.belongsTo(Video, { as: 'Video', foreignKey: 'Video_id' });
    Video.hasMany(Comments, { as: 'Comments', foreignKey: 'Video_id' });
    PlaylistVideo.belongsTo(Video, { as: 'Video', foreignKey: 'Video_id' });
    Video.hasMany(PlaylistVideo, {
        as: 'PlaylistVideos',
        foreignKey: 'Video_id',
    });
    UserHistory.belongsTo(Video, { as: 'Video', foreignKey: 'Video_id' });
    Video.hasMany(UserHistory, {
        as: 'User_histories',
        foreignKey: 'Video_id',
    });
    VideoTag.belongsTo(Video, { as: 'Video', foreignKey: 'Video_id' });
    Video.hasMany(VideoTag, { as: 'VideoTags', foreignKey: 'Video_id' });

    User.prototype.getSubCount = async function () { 
        const userSubCount = await UserSubscription.count({
            where: {
                user_subscribe_id: this.id,
            }
        });
        return userSubCount;
     }
    
     User.prototype.getSubscriptions = async function () { 
        const userSubscriptions = await UserSubscription.findAll(
            {
            attributes: ['user_id', 'user_subscribe_id'],
            where: {
                user_id: this.id,
            }
        });
        const subscriptions = [];
        for (const userSubscription of userSubscriptions) {
            const user = await User.findByPk(userSubscription.user_subscribe_id);
            subscriptions.push(user);
        }
        return subscriptions;
     }

    return {
        Comments,
        Playlist,
        PlaylistVideo,
        Tag,
        User,
        UserHistory,
        UserSubscription,
        Video,
        VideoTag,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
