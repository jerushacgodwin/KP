require('dotenv').config();
const { sequelize } = require('./src/db/db');

async function checkUsers() {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB.');
    
    // Check table structure
    const [structure] = await sequelize.query('DESCRIBE users');
    console.log('--- STRUCTURE ---');
    console.log(structure);
    
    // Check row count
    const [rows] = await sequelize.query('SELECT COUNT(*) as count FROM users');
    console.log('--- COUNT ---');
    console.log(rows[0].count);
    
    // Check for "admin" user
    const [admin] = await sequelize.query('SELECT * FROM users WHERE username = "admin" OR email = "admin@knowledgepitch.com"');
    console.log('--- ADMIN ---');
    console.log(admin);

    await sequelize.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkUsers();
