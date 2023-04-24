module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        'video_tag',
        {
            video_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'video',
                    key: 'id',
                },
            },
            tag_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'tag',
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            tableName: 'video_tag',
            timestamps: false,
            indexes: [
                {
                    name: 'tag_id',
                    using: 'BTREE',
                    fields: [{ name: 'tag_id' }],
                },
                {
                    name: 'video_id',
                    using: 'BTREE',
                    fields: [{ name: 'video_id' }],
                },
            ],
        }
    );
