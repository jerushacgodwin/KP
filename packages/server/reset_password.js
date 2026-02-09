require('dotenv').config();
const { sequelize } = require('./src/db/db');
const crypto = require('crypto');

async function resetPassword() {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB.');
    
    // admin123 hash (MD5)
    // The previous migration used: crypto.createHash('md5').update('admin123').digest('hex');
    const hash = crypto.createHash('md5').update('admin123').digest('hex');
    
    const [results] = await sequelize.query(`UPDATE users SET password = '${hash}' WHERE email = 'admin@knowledgepitch.com'`);
    console.log('Password reset result:', results);
    
    await sequelize.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

resetPassword();
