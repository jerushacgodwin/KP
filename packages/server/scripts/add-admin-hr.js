const { sequelize } = require("../src/db/db");
const { DataTypes } = require("sequelize");

const Permission = sequelize.define("Permission", {
    slug: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    group: { type: DataTypes.STRING }, 
    group_id: { type: DataTypes.INTEGER, allowNull: false },
    menuoder: { type: DataTypes.INTEGER, defaultValue: 0 },
    icon: { type: DataTypes.STRING }
}, { tableName: "permissions", timestamps: false });

async function addAdminHr() {
  try {
    await sequelize.authenticate();
    
    // Check if it already exists to be safe
    const existing = await Permission.findOne({ 
        where: { slug: '/hr', group_id: 1 } 
    });

    if (!existing) {
        await Permission.create({
            slug: '/hr',
            name: 'HR Dashboard',
            group: 'admin', // Keep it categorized under admin or main
            group_id: 1, // Admin Group
            menuoder: 99, // Put it at the end or wherever appropriate
            icon: 'home' 
        });
        console.log("Added HR Dashboard permission for Admin.");
    } else {
        console.log("Admin for HR permission already exists.");
    }
    
    // Also ensure they have staff list access if not present
    const staffPerm = await Permission.findOne({ where: { slug: '/list/staff', group_id: 1 } });
    if (!staffPerm) {
         await Permission.create({
            slug: '/list/staff',
            name: 'Staff',
            group: 'admin',
            group_id: 1,
            menuoder: 100,
            icon: 'teacher' 
        });
        console.log("Added Staff list permission for Admin.");
    }

  } catch (error) {
    console.error("Error adding admin permissions:", error);
  } finally {
    await sequelize.close();
  }
}

addAdminHr();
