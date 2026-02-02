const { sequelize } = require("../src/db/db");
const { QueryTypes } = require("sequelize");

async function debugAdminRole() {
  try {
    await sequelize.authenticate();
    
    // 1. Get Admin User
    const user = await sequelize.query("SELECT * FROM users WHERE email = 'admin@lms.com'", { type: QueryTypes.SELECT });
    console.log("Admin User:", user);

    if (user.length > 0) {
        // 2. Get User Role
        const userRole = await sequelize.query(`SELECT * FROM user_roles WHERE user_id = ${user[0].id}`, { type: QueryTypes.SELECT });
        console.log("Admin UserRole:", userRole);
    }

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await sequelize.close();
  }
}

debugAdminRole();
