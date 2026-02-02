const { sequelize } = require("../src/db/db");
const { QueryTypes } = require("sequelize");

async function checkAdminHrPermission() {
  try {
    await sequelize.authenticate();
    console.log("Connection established.");

    const permissions = await sequelize.query(
      "SELECT * FROM permissions WHERE group_id = 1 AND slug = '/hr'",
      { type: QueryTypes.SELECT }
    );

    console.log("Admin HR Permissions:", permissions);

  } catch (error) {
    console.error("Error checking permissions:", error);
  } finally {
    await sequelize.close();
  }
}

checkAdminHrPermission();
