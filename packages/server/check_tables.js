require('dotenv').config();
const { sequelize } = require('./src/db/db');

async function checkTables() {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB.');
    const [results] = await sequelize.query('SHOW TABLES');
    const tables = results.map(r => Object.values(r)[0]);
    console.log('--- TABLES START ---');
    tables.forEach(t => console.log(t));
    console.log('--- TABLES END ---');
    await sequelize.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkTables();
