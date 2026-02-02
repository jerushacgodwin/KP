const { sequelize } = require("../src/db/db");
const userService = require("../src/services/user.services");

async function testLogin() {
  try {
    await sequelize.authenticate();
    console.log("DB Connection OK");

    const email = "admin@lms.com";
    const password = "123456";

    // Debug: Check if user exists via model directly
    const userModel = require("../src/models/user.model");
    const foundUser = await userModel.findOne({ where: { email } });
    
    const fs = require('fs');
    let debugMsg = "Direct Model Check: " + (foundUser ? "FOUND ID " + foundUser.id : "NOT FOUND") + "\n";
    
    if (!foundUser) {
        debugMsg += "Listing all users via Model:\n";
        const all = await userModel.findAll({ attributes: ['id', 'email'] });
        debugMsg += JSON.stringify(all, null, 2);
    }
    fs.writeFileSync('model-debug.log', debugMsg);
    console.log(debugMsg);

    console.log(`Attempting login for ${email}...`);
    const user = await userService.loginUser({ email, password });
    console.log("Login Successful!");
    console.log("User Data:", JSON.stringify(user, null, 2));

    if (user.UserRole) {
         console.log("Role ID:", user.UserRole.get('role_id'));
    } else {
        console.log("WARNING: UserRole is missing/null");
    }

  } catch (error) {
    const fs = require('fs');
    fs.writeFileSync('login-error.log', error.stack || error.message);
    console.error("Logged error to login-error.log");
  } finally {
    await sequelize.close();
  }
}

testLogin();
