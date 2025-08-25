const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");
const LessonNote = sequelize.define(
  "LessonNote",
  {
    class_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER,
    teacher_id: DataTypes.INTEGER,
    lesson_title: DataTypes.STRING,
    chapter_title: DataTypes.STRING,
    accordion_data: DataTypes.JSON,
    attachment: DataTypes.STRING,
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
    tableName: "lesson_notes",
    timestamps: true,
    underscored: true,
  }
);
LessonNote.associate = (models) => {
  LessonNote.belongsTo(models.iClass, {
    foreignKey: "class_id",
    as: "class",
  });
  LessonNote.belongsTo(models.Subject, {
    foreignKey: "subject_id",
    as: "subject",
  });
  LessonNote.belongsTo(models.Teacher, {
    foreignKey: "teacher_id",
    as: "teacher",
  });

  return LessonNote;
};
LessonNote.LessonNoteForm = (parsed, files = {}) => {
  const { class_id, subject_id, teacher_id, lession_title, chapter_title } =
    parsed;
  const attachmentFile = files.img?.[0] ? files.img[0].filename : null;
  return {
    class_id,
    subject_id,
    teacher_id,
    lesson_title,
    chapter_title,
    accordion_data: JSON.stringify(parsed.accordionData),
    attachment: attachmentFile,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

module.exports = LessonNote;
