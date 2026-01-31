const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const LibraryReg = sequelize.define(
  "LibraryReg",
  {
    InstituteId: { type: DataTypes.INTEGER },
    LibraryId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    LibraryNo: { type: DataTypes.STRING(10), allowNull: false },
    StudentId: { type: DataTypes.STRING(10), allowNull: false },
    Year: { type: DataTypes.STRING(10) },
    LibraryDes: { type: DataTypes.TEXT },
  },
  {
    tableName: "libraryreg",
    timestamps: false,
    underscored: false,
  }
);

module.exports = LibraryReg;
