const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const UserRole = sequelize.define(
  "UserRole",
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    created_by: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  },
  {
    tableName: "user_roles",
    timestamps: true,
  }
);
module.exports = UserRole;