const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        'video',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id',
                },
            },
            identifier: {
                type: DataTypes.STRING(15),
                allowNull: false,
            },
            path: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            uploaded_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
            },
            thumbnail: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },
            upvote: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            downvote: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            views: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            length: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            bitrate: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            searchable_title: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'video',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
                {
                    name: 'user_id',
                    using: 'BTREE',
                    fields: [{ name: 'user_id' }],
                },
            ],
        }
    );
