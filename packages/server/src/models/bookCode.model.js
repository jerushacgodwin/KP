const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const BookCode = sequelize.define(
  "BookCode",
  {
    InstituteId: { type: DataTypes.INTEGER },
    BookCodeId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    BookCode: { type: DataTypes.STRING(10), allowNull: false },
    BookCategoryId: { type: DataTypes.INTEGER, allowNull: false },
    BookCodeDes: { type: DataTypes.TEXT },
  },
  {
    tableName: "bookcode",
    timestamps: false,
    underscored: false,
  }
);

module.exports = BookCode;
