const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const Chapter = sequelize.define(
  "Chapter",
  {
    class_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "chapters",
    timestamps: true,
    underscored: true,
  }
);

Chapter.associate = (models) => {
  Chapter.belongsTo(models.iClass, {
    foreignKey: "class_id",
    as: "class",
  });
  Chapter.belongsTo(models.Subject, {
    foreignKey: "subject_id",
    as: "subject",
  });
  Chapter.hasMany(models.LessonNote, {
      foreignKey: "chapter_title", 
      sourceKey: "title",
      as: "lessons"
  }); // Using title association for now as legacy support, later we can migrate to IDs
};

module.exports = Chapter;
