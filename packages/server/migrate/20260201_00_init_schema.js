const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const crypto = require('crypto');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dumpPath = path.join(__dirname, 'sql/init_dump_full.sql');
    console.log(`Reading dump from ${dumpPath}`);
    const sql = fs.readFileSync(dumpPath, 'utf8');

    // 1. Generate MD5 Hash for admin password (as required by the backend)
    const hash = crypto.createHash('md5').update('admin123').digest('hex');
    console.log('Generated Admin Key hash (MD5).');

    // 2. Define Admin Data SQL
    const adminSql = `
    -- Admin Data Insertion
    INSERT IGNORE INTO schools (code, name, address) VALUES ('SCH001', 'Knowledge Pitch', 'Default Address');
    
    INSERT IGNORE INTO users (school_id, name, username, email, password, status, created_at, updated_at) 
    VALUES ('SCH001', 'Admin User', 'admin', 'admin@knowledgepitch.com', '${hash}', '1', NOW(), NOW());
    
    INSERT IGNORE INTO user_roles (user_id, role_id, created_at, updated_at) 
    SELECT id, 1, NOW(), NOW() FROM users WHERE email = 'admin@knowledgepitch.com';
    `;
    
    // 3. Combine initial dump with admin data
    // We disable strict mode for the session to handle legacy null/empty value issues in the dump
    const combinedSql = "SET SESSION sql_mode = '';\n" + sql + "\n" + adminSql;
    const tempFilePath = path.join(__dirname, 'sql/temp_init_execution_final.sql');
    fs.writeFileSync(tempFilePath, combinedSql);

    // 4. Get database credentials from environment
    const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
    const host = DB_HOST || 'mysql';
    const user = DB_USER || 'root';
    const password = DB_PASSWORD || 'root';
    const database = DB_NAME || 'sms_2_0';

    // 5. Execute via native MySQL CLI (to handle triggers and delimiters correctly)
    console.log('Executing combined SQL dump via native mysql client...');
    const command = `mysql --skip-ssl -h "${host}" -u "${user}" -p"${password}" "${database}" < "${tempFilePath}"`;

    await new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            // Clean up temp file
            try { fs.unlinkSync(tempFilePath); } catch (e) {}

            if (error) {
                console.error(`Execution error: ${error}`);
                console.error(`stderr: ${stderr}`);
                return reject(error);
            }
            console.log(`stdout: ${stdout}`);
            resolve();
        });
    });

    console.log('Migration completed successfully.');
  },

  down: async (queryInterface, Sequelize) => {
     console.log('Down migration not implemented.');
  }
};
