const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'sms_2_0',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'root',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    // logging: process.env.NODE_ENV === 'development' ? false : false,
  }
);

async function connectDb() {
  try {
    await sequelize.authenticate();
      } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
}

module.exports = { connectDb, sequelize };
