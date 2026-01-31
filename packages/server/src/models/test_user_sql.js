const { sequelize } = require('../db/db');
const User = require('./user.model');
const UserRole = require('./user.role.model');

async function test() {
    try {
        await sequelize.authenticate();
        console.log('DB Connected');
        
        // Setup association like in user.services.js
        User.hasOne(UserRole, { foreignKey: 'user_id' });
        
        console.log('--- FETCHING ONE USER ---');
        const u = await User.findOne({ 
            where: { email: 'admin@gmail.com' },
            include: [{ model: UserRole, attributes: ['role_id'] }],
            logging: (sql) => console.log('SQL GENERATED:\n', sql)
        });
        
        if (u) {
            console.log('SUCCESS findOne');
        } else {
            console.log('User not found but query executed.');
        }

    } catch (err) {
        console.error('TEST ERROR:', err.message);
        if (err.sql) console.error('FAILED SQL:', err.sql);
    } finally {
        await sequelize.close();
    }
}
test();
