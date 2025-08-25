const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');
//const StudentAttendance = require('./attendance.model').StudentAttendance
const Student = sequelize.define('Student', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Assumes 'users' table exists
      key: 'id',
    },
  },
  class_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'i_classes', // Assumes 'classes' table exists
      key: 'class_id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
}, {
  timestamps: false, // Disable createdAt and updatedAt
  tableName: 'students',
});
const Staff = sequelize.define('staff', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Assumes 'users' table exists
      key: 'id',
    },
  },


  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
}, {
  timestamps: false, // Disable createdAt and updatedAt
  tableName: 'employees',
});

module.exports = {
   Student: Student,  // for student_attendances table
  Staff: Staff   }