const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const User = sequelize.define("User",{
    name: {
        type: DataTypes.STRING
    },

    email: {
        type: DataTypes.STRING,
        unique: true
    },

    password: {
        type: DataTypes.STRING
    },

    role: {
        type: DataTypes.ENUM('admin','employee')
    },

    phone_number: {
        type: DataTypes.STRING
    },

    profile_image: {
        type: DataTypes.STRING
    },

    refreshToken: {
        type: DataTypes.TEXT
    },

    status: {
        type: DataTypes.ENUM('active','inactive'),
        defaultValue: 'active' // Optional: sets a default value
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW // Handled by Node.js
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});
module.exports = User;