const { sequelize } = require("../src/db/db");
const crypto = require('crypto');
const { DataTypes } = require("sequelize");

// Define minimal models for script
const Role = sequelize.define("Role", {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
}, { tableName: 'roles', timestamps: false });

const User = sequelize.define('user', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  school_id: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('0', '1'), defaultValue: '1' }
}, { timestamps: false, tableName: 'users', freezeTableName: true });

const UserRole = sequelize.define("UserRole", {
    user_id: { type: DataTypes.INTEGER, primaryKey: true },
    role_id: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: "user_roles", timestamps: true });

const Permission = sequelize.define("Permission", {
    slug: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    group: { type: DataTypes.STRING }, // e.g., 'hr'
    group_id: { type: DataTypes.INTEGER, allowNull: false },
    menuoder: { type: DataTypes.INTEGER, defaultValue: 0 },
    icon: { type: DataTypes.STRING }
}, { tableName: "permissions", timestamps: false });

async function setupHr() {
  try {
    await sequelize.authenticate();
    console.log("Connection established.");

    // 1. Get HR Role
    let hrRole = await Role.findOne({ where: { name: 'HR' } });
    if (!hrRole) {
         hrRole = await Role.create({ name: 'HR' });
         console.log(`Created HR Role: ${hrRole.id}`);
    } else {
        console.log(`HR Role ID: ${hrRole.id}`);
    }

    // 2. Ensure HR User
    const passwordHash = crypto.createHash('md5').update('123456').digest('hex');
    const email = 'hr@lms.com';
    let user = await User.findOne({ where: { email } });
    
    if (!user) {
        user = await User.create({
            username: 'hr_manager',
            email: email,
            password: passwordHash,
            school_id: 'SCH001',
            status: '1'
        });
        console.log("Created HR User.");
    } else {
        console.log("HR User exists.");
    }

    // 3. Assign Role
    const userRole = await UserRole.findOne({ where: { user_id: user.id } });
    if (!userRole) {
        await UserRole.create({ user_id: user.id, role_id: hrRole.id });
        console.log("Assigned Role.");
    } else if (userRole.role_id !== hrRole.id) {
        await UserRole.update({ role_id: hrRole.id }, { where: { user_id: user.id } });
        console.log("Updated Role.");
    }

    // 4. Create Permissions for HR (Group ID = hrRole.id)
    const permissions = [
        { slug: '/hr', name: 'Home', icon: 'home' },
        { slug: '/list/teachers', name: 'Teachers', icon: 'teacher' },
        { slug: '/list/students', name: 'Students', icon: 'student' },
        { slug: '/list/parents', name: 'Parents', icon: 'parent' },
        { slug: '/list/announcements', name: 'Announcements', icon: 'announcement' },
        { slug: '/list/events', name: 'Events', icon: 'calendar' }
        // Add more as needed
    ];

    // Clear existing HR permissions to avoid dupes/stale data
    await sequelize.query(`DELETE FROM permissions WHERE group_id = ${hrRole.id}`);
    console.log("Cleared old HR permissions.");

    for (const p of permissions) {
        await Permission.create({
            slug: p.slug,
            name: p.name,
            group: 'hr', // This matches the folder name technically, but mostly for grouping
            group_id: hrRole.id, // THE IMPORTANT PART
            menuoder: 0,
            icon: p.icon
        });
    }
    console.log(`Inserted ${permissions.length} permissions for HR.`);

  } catch (error) {
    console.error("Error setting up HR:", error);
  } finally {
    await sequelize.close();
  }
}

setupHr();
