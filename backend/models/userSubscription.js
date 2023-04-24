module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        'user_subscription',
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id',
                },
            },
            user_subscribe_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            tableName: 'user_subscription',
            timestamps: false,
            indexes: [
                {
                    name: 'user_id',
                    using: 'BTREE',
                    fields: [{ name: 'user_id' }],
                },
                {
                    name: 'user_subscribe_id',
                    using: 'BTREE',
                    fields: [{ name: 'user_subscribe_id' }],
                },
            ],
        }
    );
