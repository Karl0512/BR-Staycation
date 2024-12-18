const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST, // Example: 'localhost'
  username: process.env.DB_USER, // Example: 'user'
  password: process.env.DB_PASSWORD, // Example: 'password'
  database: process.env.DB_NAME, // Example: 'BrStaycation'
  port: process.env.DB_PORT, // Default PostgreSQL port
});

async function authenticateDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { sequelize, authenticateDB };
