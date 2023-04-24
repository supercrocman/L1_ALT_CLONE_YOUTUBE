module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        'comments',
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
            video_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'video',
                    key: 'id',
                },
            },
            message: {
                type: DataTypes.STRING(300),
                allowNull: false,
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
            parent_comment_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'comments',
                    key: 'id',
                },
            },
            publisher_like: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            tableName: 'comments',
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
                {
                    name: 'video_id',
                    using: 'BTREE',
                    fields: [{ name: 'video_id' }],
                },
                {
                    name: 'parent_comment_id',
                    using: 'BTREE',
                    fields: [{ name: 'parent_comment_id' }],
                },
            ],
        }
    );
