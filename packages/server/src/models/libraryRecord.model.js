const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const LibraryRecord = sequelize.define(
  "LibraryRecord",
  {
    InstituteId: { type: DataTypes.INTEGER },
    LibraryRecordId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    LibraryNo: { type: DataTypes.STRING(5), allowNull: false },
    BookCode: { type: DataTypes.STRING(5), allowNull: false },
    IssuedDate: { type: DataTypes.DATEONLY, allowNull: false },
    ReturnDate: { type: DataTypes.DATEONLY, allowNull: false },
    ReceivedDate: { type: DataTypes.DATEONLY },
    Year: { type: DataTypes.STRING(10) },
    LibraryDes: { type: DataTypes.TEXT },
  },
  {
    tableName: "libraryrecord",
    timestamps: false,
    underscored: false,
  }
);

module.exports = LibraryRecord;
