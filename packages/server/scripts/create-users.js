const { sequelize } = require("../src/db/db");
const crypto = require('crypto');
const { DataTypes } = require("sequelize");

// Define basic models here to avoid importing issues if paths are complex
const User = sequelize.define('user', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  school_id: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('0', '1'), defaultValue: '1' }
}, { timestamps: false, tableName: 'users', freezeTableName: true });

const UserRole = sequelize.define("UserRole", {
    user_id: { type: DataTypes.INTEGER, primaryKey: true }, // Removing autoIncrement for manual setting
    role_id: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: "user_roles", timestamps: true });

async function createUsers() {
  try {
    await sequelize.authenticate();
    console.log("Connection established.");

    const passwordHash = crypto.createHash('md5').update('123456').digest('hex');
    const users = [
        { username: 'admin', email: 'admin@lms.com', role: 1, school_id: 'SCH001' },
        { username: 'teacher', email: 'teacher@lms.com', role: 2, school_id: 'SCH001' },
        { username: 'student', email: 'student@lms.com', role: 3, school_id: 'SCH001' },
        { username: 'parent', email: 'parent@lms.com', role: 4, school_id: 'SCH001' }
    ];

    for (const u of users) {
        // Check if user exists
        let user = await User.findOne({ where: { email: u.email } });
        
        if (!user) {
            console.log(`Creating user: ${u.username}`);
            // Force a specific ID if we can, or let it auto-increment? 
            // Better to let it auto-increment but we need to know what it is.
            user = await User.create({
                username: u.username,
                email: u.email,
                password: passwordHash,
                school_id: u.school_id,
                status: '1'
            });
            console.log(`User created with ID: ${user.id}`);
        } else {
            console.log(`User ${u.username} already exists. ID: ${user.id}`);
            // Update password just in case
            user.password = passwordHash;
            await user.save();
        }

        // Assign Role
        // Check if role exists
        const roleAssigned = await UserRole.findOne({ where: { user_id: user.id } });
        if (!roleAssigned) {
             console.log(`Assigning role ${u.role} to user ${user.id}`);
             await UserRole.create({
                 user_id: user.id,
                 role_id: u.role
             });
        } else {
            console.log(`User ${user.id} already has role ${roleAssigned.role_id}. Updating to ${u.role}...`);
            await UserRole.update({ role_id: u.role }, { where: { user_id: user.id } });
        }
    }

    console.log("Users created/updated successfully.");

  } catch (error) {
    console.error("Error creating users:", error);
  } finally {
    await sequelize.close();
  }
}

createUsers();
