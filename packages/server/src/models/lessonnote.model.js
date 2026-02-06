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
    video_urls: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: true
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
  const { class_id, subject_id, teacher_id, lesson_title, chapter_title } =
    parsed;
  const attachmentFile = files.img?.[0] ? files.img[0].filename : null;
  
  let video_urls = [];
  try {
     video_urls = parsed.video_urls ? JSON.parse(parsed.video_urls) : [];
  } catch (e) {
      // If it's already an array or not valid JSON string, handle gracefully
     video_urls = Array.isArray(parsed.video_urls) ? parsed.video_urls : [];
  }

  return {
    class_id,
    subject_id,
    teacher_id,
    lesson_title,
    chapter_title,
    accordion_data: parsed.accordionData, 
    attachment: attachmentFile,
    file_path: files.file?.[0] ? files.file[0].filename : null,
    video_urls: video_urls,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

module.exports = LessonNote;
