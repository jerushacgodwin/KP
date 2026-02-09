require('dotenv').config();
const { sequelize } = require('./src/db/db');
const userService = require('./src/services/user.services');
const fs = require('fs');

async function checkLogin() {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB.');
    
    console.log('Attempting login...');
    const result = await userService.loginUser({
      email: 'admin@knowledgepitch.com',
      password: 'somepassword'
    });
    console.log('Login result:', result);

    await sequelize.close();
  } catch (error) {
    console.error('Login Error:', error);
    fs.writeFileSync('login_error.txt', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
  }
}

checkLogin();
