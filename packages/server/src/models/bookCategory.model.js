const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const BookCategory = sequelize.define(
  "BookCategory",
  {
    InstituteId: { type: DataTypes.INTEGER },
    BookCategoryId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    BookCategory: { type: DataTypes.STRING(256), allowNull: false },
    BookCategoryDes: { type: DataTypes.TEXT },
  },
  {
    tableName: "bookcategory",
    timestamps: false,
    underscored: false,
  }
);

module.exports = BookCategory;
