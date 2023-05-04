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
                    primaryKey: true,
                },
            },
            user_subscribe_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id',
                    primaryKey: true,
                },
            },
        },
        {
            sequelize,
            tableName: 'user_subscription',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'user_id' },
                        { name: 'user_subscribe_id' },
                    ],
                },
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
