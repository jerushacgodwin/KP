const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const SchoolFinance = sequelize.define('SchoolFinance', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  type: {
    type: DataTypes.ENUM('income', 'expense'),
    allowNull: false,
  },

  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  student_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
    references: {
      model: 'students', // Replace with your actual student table name
      key: 'id',
    },
    onDelete: 'SET NULL',
  },

  staff_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
    references: {
      model: 'employees', // Replace with your actual staff table name
      key: 'id',
    },
    onDelete: 'SET NULL',
  },

  created_by: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
}, {
  tableName: 'school_finances',
  timestamps: true,
});

module.exports = SchoolFinance;