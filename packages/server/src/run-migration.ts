import { sequelize } from './db/db';
import fs from 'fs';
import path from 'path';

async function runMigrations() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected.');

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
      console.log('No migrations to run.');
      process.exit(0);
    }

    console.log(`Found ${migrationFiles.length} migrations.`);
    const queryInterface = sequelize.getQueryInterface();

    for (const file of migrationFiles) {
      console.log(`\n🚀 Running migration: ${file}`);
      const migration = require(path.join(migrationsDir, file));
      
      if (typeof migration.up !== 'function') {
        console.warn(`⚠️  Skipping ${file}: No "up" function found.`);
        continue;
      }

      try {
        await migration.up(queryInterface, sequelize.constructor);
        console.log(`✅ ${file} completed.`);
      } catch (err) {
        console.error(`❌ Migration ${file} failed:`, err);
        process.exit(1);
      }
    }

    console.log('\n✨ All migrations completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error);
    process.exit(1);
  }
}

runMigrations();
