const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const StaffType = sequelize.define(
  "StaffType",
  {
    InstituteId: { type: DataTypes.INTEGER },
    StaffTypeId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    StaffType: { type: DataTypes.CHAR(200), allowNull: false },
    StaffDes: { type: DataTypes.TEXT },
  },
  {
    tableName: "stafftype",
    timestamps: false,
    underscored: false,
  }
);

module.exports = StaffType;
