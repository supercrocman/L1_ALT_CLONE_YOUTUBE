module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        'playlist_video',
        {
            playlist_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'playlist',
                    key: 'id',
                },
            },
            video_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'video',
                    key: 'id',
                },
                ord: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
        },
        {
            sequelize,
            tableName: 'playlist_video',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'playlist_id' }, { name: 'video_id' }],
                },
                {
                    name: 'playlist_id',
                    using: 'BTREE',
                    fields: [{ name: 'playlist_id' }],
                },
                {
                    name: 'video_id',
                    using: 'BTREE',
                    fields: [{ name: 'video_id' }],
                },
            ],
        }
    );
