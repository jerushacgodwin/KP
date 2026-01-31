
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const sqlPath = path.join(__dirname, 'sql/init_dump_full.sql');
const hash = bcrypt.hashSync('admin123', 10);

const adminSql = `
-- Admin Data Insertion
INSERT INTO schools (code, name, address) VALUES ('SCH001', 'Knowledge Pitch', 'Default Address');
INSERT INTO users (school_id, name, username, email, password, status, created_at, updated_at) VALUES ('SCH001', 'Admin User', 'admin', 'admin@knowledgepitch.com', '${hash}', '1', NOW(), NOW());
INSERT INTO user_roles (user_id, role_id, created_at, updated_at) SELECT id, 1, NOW(), NOW() FROM users WHERE username = 'admin';
`;

// Append to file
try {
  fs.appendFileSync(sqlPath, adminSql);
  console.log('Successfully appended Admin SQL to init_dump_full.sql');
} catch (err) {
  console.error('Failed to append SQL:', err);
  process.exit(1);
}
