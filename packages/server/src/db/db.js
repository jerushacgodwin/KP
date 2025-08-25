const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sms_2_0', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
 // logging: process.env.NODE_ENV === 'development' ? false : false,
});

async function connectDb() {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
}

module.exports = { connectDb, sequelize };
