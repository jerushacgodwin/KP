const { sequelize } = require("../src/db/db");
const { QueryTypes } = require("sequelize");

async function checkRoles() {
  try {
    await sequelize.authenticate();
    console.log("Connection established.");

    const roles = await sequelize.query("SELECT * FROM roles", { type: QueryTypes.SELECT });
    console.log("Roles found:", roles);

  } catch (error) {
    console.error("Error checking roles:", error);
  } finally {
    await sequelize.close();
  }
}

checkRoles();
