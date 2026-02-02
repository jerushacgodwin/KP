const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dumpPath = path.join(__dirname, 'sql/init_dump_full.sql');
    console.log(`Reading dump from ${dumpPath}`);
    const sql = fs.readFileSync(dumpPath, 'utf8').replace(/^\uFEFF/, '');
    const hash = crypto.createHash('md5').update('admin123').digest('hex');

    const adminSql = `
    INSERT IGNORE INTO schools (code, name, address) VALUES ('SCH001', 'Knowledge Pitch', 'Default Address');
    INSERT IGNORE INTO users (school_id, name, username, email, password, status, created_at, updated_at) 
    VALUES ('SCH001', 'Admin User', 'admin', 'admin@knowledgepitch.com', '${hash}', '1', NOW(), NOW());
    INSERT IGNORE INTO user_roles (user_id, role_id, created_at, updated_at) 
    SELECT id, 1, NOW(), NOW() FROM users WHERE email = 'admin@knowledgepitch.com';
    `;
    
    const combinedSql = "SET SESSION sql_mode = '';\n" + sql + "\n" + adminSql;
    const tempFilePath = path.join(__dirname, 'sql/temp_init_execution_final.sql');
    fs.writeFileSync(tempFilePath, combinedSql);

    console.log('Executing combined SQL dump via batch script...');
    const { execSync } = require('child_process');
    const batPath = path.join(__dirname, '../run_sql.bat');
    
    console.log('Running bat:', batPath);
    console.log('SQL file:', tempFilePath);
    
    try {
        execSync(`"${batPath}" "${tempFilePath}"`, { stdio: 'inherit' });
        try { fs.unlinkSync(tempFilePath); } catch (e) {}
    } catch (err) {
        console.error('Migration failed at SQL execution stage.');
        try { fs.unlinkSync(tempFilePath); } catch (e) {}
        throw err;
    }

    console.log('Migration completed successfully.');
  },

  down: async (queryInterface, Sequelize) => {
     console.log('Down migration not implemented.');
  }
};
