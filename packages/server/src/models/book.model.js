const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const Book = sequelize.define(
  "Book",
  {
    InstituteId: { type: DataTypes.INTEGER },
    BookId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    BookName: { type: DataTypes.STRING(256), allowNull: false },
    BookCode: { type: DataTypes.STRING(10), allowNull: false },
    BookCategoryId: { type: DataTypes.INTEGER, allowNull: false },
    BookAuthor: { type: DataTypes.STRING(256), allowNull: false },
    BookVolume: { type: DataTypes.STRING(10) },
    BookEdition: { type: DataTypes.STRING(10) },
    BookStatus: { type: DataTypes.TINYINT(1), allowNull: false },
    BookDes: { type: DataTypes.TEXT },
  },
  {
    tableName: "book",
    timestamps: false,
    underscored: false,
  }
);

Book.associate = (models) => {
  Book.belongsTo(models.BookCategory, {
    foreignKey: "BookCategoryId",
    as: "category",
  });
};

module.exports = Book;
