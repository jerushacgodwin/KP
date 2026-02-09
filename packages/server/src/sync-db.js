const { sequelize } = require('./db/db');
require('./models/user.model'); // Import models so they are registered

async function sync() {
  try {
    await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        process.exit(0);
  } catch (error) {
    console.error('Error syncing database:', error);
    process.exit(1);
  }
}

sync();
