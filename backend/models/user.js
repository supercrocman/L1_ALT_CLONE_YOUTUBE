module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        'user',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            identifier: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: 'identifier',
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: 'email',
            },
            email_confirmation_token: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            password_reminder_token: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            password_reminder_expire: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            avatar: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
            verified: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            banned: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },
            createdAt: {
                field: 'created_at',
                type: DataTypes.DATE,
            },
            updatedAt: {
                field: 'updated_at',
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            tableName: 'user',
            timestamps: true,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
                {
                    name: 'identifier',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'identifier' }],
                },
                {
                    name: 'email',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'email' }],
                },
            ],
        }
    );
