const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

// Import related models for association if needed later
// const Subject = require('./subject.model');
// const Class = require('./iclass.model');
// const Teacher = require('./staff.model');

const Exam = sequelize.define('Exam', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  lesson_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  subject_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  class_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  teacher_id: {
    type: DataTypes.INTEGER, 
    allowNull: true
  }
}, {
  tableName: 'exams',
  timestamps: true,
  underscored: true
});

module.exports = Exam;
