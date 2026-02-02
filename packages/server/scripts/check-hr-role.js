const { sequelize } = require("../src/db/db");
const { QueryTypes } = require("sequelize");

async function checkHrUser() {
  try {
    await sequelize.authenticate();
    const result = await sequelize.query(
        `SELECT u.id, u.username, u.email, ur.role_id 
         FROM users u 
         JOIN user_roles ur ON u.id = ur.user_id 
         WHERE u.email = 'hr@lms.com'`, 
         { type: QueryTypes.SELECT }
    );
    console.log("HR User Details:", result);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await sequelize.close();
  }
}

checkHrUser();
