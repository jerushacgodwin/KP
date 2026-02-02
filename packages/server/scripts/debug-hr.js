const { sequelize } = require("../src/db/db");
const { QueryTypes } = require("sequelize");

async function debugHr() {
  try {
    await sequelize.authenticate();
    
    const users = await sequelize.query("SELECT * FROM users", { type: QueryTypes.SELECT });
    console.log("All Users:", users);

    const role = await sequelize.query("SELECT * FROM roles WHERE name = 'HR'", { type: QueryTypes.SELECT });
    console.log("HR Role:", role);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await sequelize.close();
  }
}

debugHr();
