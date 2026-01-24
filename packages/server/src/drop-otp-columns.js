const { sequelize } = require('./db/db');

async function dropColumns() {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB.');
    
    // Check if columns exist before dropping (optional, but safe)
    // For simplicity, we assume they exist as we just added them.
    // Using raw query to drop
    await sequelize.query('ALTER TABLE Users DROP COLUMN otp, DROP COLUMN otp_expires_at;');
    
    console.log('Columns dropped successfully.');
    process.exit(0);
  } catch (error) {
    // If error is "check that column/key exists", it's fine
    if (error.original && error.original.code === 'ER_CANT_DROP_FIELD_OR_KEY') {
        console.log("Columns likely already dropped.");
        process.exit(0);
    }
    console.error('Error dropping columns:', error);
    process.exit(1);
  }
}

dropColumns();
