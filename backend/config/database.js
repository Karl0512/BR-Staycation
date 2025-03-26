const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Disable logging (optional)
});

async function authenticateDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection successful!');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
}

module.exports = { sequelize, authenticateDB };
