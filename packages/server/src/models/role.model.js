const { DataTypes, cast } = require("sequelize");
const { sequelize } = require("../db/db");
const Role = sequelize.define(
  "Role",{
     id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    deletable: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    deleted_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'roles',
    timestamps: false,
    paranoid: false
  });

  //return Role;
module.exports = Role;