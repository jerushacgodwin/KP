const { sequelize } = require('./packages/server/src/db/db');
const { QueryTypes } = require("sequelize");

async function diagnose() {
    try {
        await sequelize.authenticate();
        console.log('--- DB OK ---');
        
        // Check users table specifically
        const [users] = await sequelize.query("SELECT * FROM users LIMIT 1");
        console.log('Lowercase users query: OK');
        
        try {
            await sequelize.query("SELECT * FROM Users LIMIT 1");
            console.log('Uppercase Users query: OK (Probably Windows or case-insensitive DB)');
        } catch (e) {
            console.log('Uppercase Users query: FAILED (Expected on Linux/Docker)');
            console.log('Error:', e.message);
        }
        
    } catch (e) {
        console.error('FATAL:', e.message);
    } finally {
        await sequelize.close();
    }
}
diagnose();
