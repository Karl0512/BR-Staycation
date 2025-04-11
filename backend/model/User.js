const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactnumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'staff', 'client'), // Define the ENUM for roles
    allowNull: false,
    defaultValue: 'client', // Set default role to 'client'
  },
  status: {
    type: DataTypes.ENUM('active', 'deactivated'),
    allowNull: false,
    defaultValue: 'active'
  }
}, {
  timestamps: true,
})

module.exports = User;