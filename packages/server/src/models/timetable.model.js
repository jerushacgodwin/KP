const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');
const Timetable = sequelize.define('Timetable', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  class: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  day: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  teacher: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'timetable',
});

module.exports = Timetable;
