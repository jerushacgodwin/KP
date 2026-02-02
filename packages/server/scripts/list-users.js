const { sequelize } = require("../src/db/db");
const { QueryTypes } = require("sequelize");

async function listUsers() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const users = await sequelize.query("SELECT * FROM users", { type: QueryTypes.SELECT });
    console.log("Users found:", users.length);
    console.log(JSON.stringify(users, null, 2));

  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
}

listUsers();
