const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const Permission = sequelize.define(
  "Permission",
  {
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
    group: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "permissions",
    timestamps: false, // we already have created_at
  }
);
module.exports = Permission;