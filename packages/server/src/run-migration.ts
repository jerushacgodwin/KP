import { sequelize } from './db/db';
import fs from 'fs';
import path from 'path';

async function runMigrations() {
  try {
    await sequelize.authenticate();
    
    const migrationsDir = path.join(__dirname, '../migrate');
    
    if (!fs.existsSync(migrationsDir)) {
      console.error('❌ Migrations directory not found.');
      process.exit(1);
    }

    // Get all JS files in alphabetical order
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.js'))
      .sort();

    if (migrationFiles.length === 0) {
            process.exit(0);
    }

        const queryInterface = sequelize.getQueryInterface();

    for (const file of migrationFiles) {
            const migration = require(path.join(migrationsDir, file));
      
      if (migration && migration.disabled) {
                continue;
      }

      if (typeof migration.up !== 'function') {
        console.warn(`⚠️  Skipping ${file}: No "up" function found.`);
        continue;
      }

      try {
        await migration.up(queryInterface, sequelize.constructor);
              } catch (err) {
        console.error(`❌ Migration ${file} failed:`, err);
        process.exit(1);
      }
    }

        process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error);
    process.exit(1);
  }
}

runMigrations();
