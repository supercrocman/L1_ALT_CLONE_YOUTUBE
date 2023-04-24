module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        'user_history',
        {
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
            watchtime: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            tableName: 'user_history',
            timestamps: false,
            indexes: [
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
            ],
        }
    );
