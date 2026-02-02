const { sequelize } = require("../src/db/db");
const { QueryTypes } = require("sequelize");

async function listRolesAttribute() {
  try {
    await sequelize.authenticate();
    console.log("Connection established.");

    const roles = await sequelize.query("SELECT id, name FROM roles", { type: QueryTypes.SELECT });
    console.log("Roles List:", JSON.stringify(roles, null, 2));

  } catch (error) {
    console.error("Error checking roles:", error);
  } finally {
    await sequelize.close();
  }
}

listRolesAttribute();
