const { sequelize } = require("../src/db/db");
const crypto = require('crypto');
const { DataTypes } = require("sequelize");

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

async function recreateAdmin() {
  try {
    await sequelize.authenticate();
    
    const email = 'admin@lms.com';
    const passwordHash = crypto.createHash('md5').update('123456').digest('hex');

    let user = await User.findOne({ where: { email } });
    
    if (!user) {
        console.log("Admin user missing. Creating...");
        user = await User.create({
            username: 'admin',
            email: email,
            password: passwordHash,
            school_id: 'SCH001',
            status: '1'
        });
        console.log(`Created Admin User: ${user.id}`);
    } else {
        console.log(`Admin User exists: ${user.id}. Updating password...`);
        user.password = passwordHash;
        await user.save();
    }

    // Assign Role 1
    const userRole = await UserRole.findOne({ where: { user_id: user.id } });
    if (!userRole) {
        await UserRole.create({ user_id: user.id, role_id: 1 });
        console.log("Assigned Role 1 to Admin.");
    } else {
        if (userRole.role_id !== 1) {
            await UserRole.update({ role_id: 1 }, { where: { user_id: user.id } });
            console.log("Updated Admin role to 1.");
        } else {
            console.log("Admin already has Role 1.");
        }
    }

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await sequelize.close();
  }
}

recreateAdmin();
