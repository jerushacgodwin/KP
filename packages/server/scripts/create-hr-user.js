const { sequelize } = require("../src/db/db");
const crypto = require('crypto');
const { DataTypes } = require("sequelize");

const Role = sequelize.define("Role", {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    deletable: { type: DataTypes.TINYINT, defaultValue: 1 }
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

async function createHrUser() {
  try {
    await sequelize.authenticate();
    console.log("Connection established.");

    // 1. Find or Create HR Role
    let hrRole = await Role.findOne({ where: { name: 'HR' } });
    if (!hrRole) {
        console.log("HR Role not found. Creating...");
        hrRole = await Role.create({ name: 'HR' });
        console.log(`Created HR Role with ID: ${hrRole.id}`);
    } else {
        console.log(`HR Role exists with ID: ${hrRole.id}`);
    }

    // 2. Create HR User
    const passwordHash = crypto.createHash('md5').update('123456').digest('hex');
    const email = 'hr@lms.com';
    let user = await User.findOne({ where: { email } });

    if (!user) {
        user = await User.create({
            username: 'hr_admin',
            email: email,
            password: passwordHash,
            school_id: 'SCH001',
            status: '1'
        });
        console.log(`Created HR User: ${user.id}`);
    } else {
        console.log(`HR User already exists: ${user.id}`);
        user.password = passwordHash;
        await user.save();
    }

    // 3. Assign Role
    const roleAssigned = await UserRole.findOne({ where: { user_id: user.id } });
    if (!roleAssigned) {
        await UserRole.create({ user_id: user.id, role_id: hrRole.id });
        console.log("Assigned HR role to user.");
    } else {
        if (roleAssigned.role_id !== hrRole.id) {
            await UserRole.update({ role_id: hrRole.id }, { where: { user_id: user.id } });
            console.log(`Updated user role to HR (${hrRole.id})`);
        } else {
            console.log("User already has HR role.");
        }
    }

  } catch (error) {
    console.error("Error creating HR user:", error);
  } finally {
    await sequelize.close();
  }
}

createHrUser();
