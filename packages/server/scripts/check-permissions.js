const { sequelize } = require("../src/db/db");
const { QueryTypes } = require("sequelize");

async function checkPermissions() {
  try {
    await sequelize.authenticate();
    console.log("Connection established.");

    const permissions = await sequelize.query(
      "SELECT * FROM permissions WHERE group_id = 1",
      { type: QueryTypes.SELECT }
    );

    console.log(`Found ${permissions.length} permissions for Group ID 1 (Admin)`);
    if (permissions.length > 0) {
        console.log("First permission sample:", permissions[0]);
    }

  } catch (error) {
    console.error("Error checking permissions:", error);
  } finally {
    await sequelize.close();
  }
}

checkPermissions();
