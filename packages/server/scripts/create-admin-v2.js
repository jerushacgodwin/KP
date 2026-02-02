const { sequelize } = require("../src/db/db");
const User = require("../src/models/user.model");
const crypto = require('crypto');
const { DataTypes } = require("sequelize");

const UserRole = sequelize.define("UserRole", {
    user_id: { type: DataTypes.INTEGER, primaryKey: true },
    role_id: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: "user_roles", timestamps: true });

async function createAdmin() {
    const fs = require('fs');
    try {
        await sequelize.authenticate();
        console.log("DB connected");

        const email = 'admin@lms.com';
        const hashedPassword = crypto.createHash('md5').update('123456').digest('hex');
        
        const { Op } = require("sequelize");
        console.log("Checking for existing user (email or username)...");
        let user = await User.findOne({ 
            where: { 
                [Op.or]: [
                    { email: email },
                    { username: 'admin' }
                ]
            } 
        });

        if (!user) {
            console.log("Creating NEW Admin User...");
            try {
                user = await User.create({
                    username: 'admin',
                    name: 'Super Admin',
                    email: email,
                    password: hashedPassword,
                    school_id: 'SCH001',
                    status: '1'
                });
                console.log(`User Created! ID: ${user.id}`);
            } catch (createError) {
                console.error("Creation Failed:", createError);
                fs.writeFileSync('creation-error.log', JSON.stringify(createError, null, 2));
                throw createError;
            }
        } else {
            console.log(`User exists (ID: ${user.id}). Updating password and email...`);
            user.password = hashedPassword;
            user.email = email; // Force update email to admin@lms.com
            // Ensure username is 'admin' too just in case we matched by email
            user.username = 'admin'; 
            await user.save();
        }

        // Assign Role
        console.log("Assigning Role 1...");
        const role = await UserRole.findOne({ where: { user_id: user.id } });
        if (!role) {
            await UserRole.create({ user_id: user.id, role_id: 1 });
            console.log("Role Assigned.");
        } else {
            if (role.role_id !== 1) {
                role.role_id = 1;
                await role.save();
                console.log("Role updated to 1.");
            } else {
                console.log("Role is already 1.");
            }
        }

    } catch (err) {
        console.error("Critical Error:", err);
        fs.writeFileSync('admin-script-error.log', err.stack);
    } finally {
        await sequelize.close();
    }
}

createAdmin();
