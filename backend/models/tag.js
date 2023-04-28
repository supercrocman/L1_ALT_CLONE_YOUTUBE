module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        'tag',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: 'name',
            },
        },
        {
            sequelize,
            tableName: 'tag',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
                {
                    name: 'name',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'name' }],
                },
            ],
        }
    );
