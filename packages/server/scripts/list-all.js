const { sequelize } = require("../src/db/db");
const { QueryTypes } = require("sequelize");

async function listAll() {
  try {
    await sequelize.authenticate();
    const users = await sequelize.query("SELECT id, username, email FROM users", { type: QueryTypes.SELECT });
    console.log("All Users:", JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await sequelize.close();
  }
}

listAll();
