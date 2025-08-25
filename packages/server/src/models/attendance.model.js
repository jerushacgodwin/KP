const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');
const {
  Student: studentUti,
  Staff,
} = require("../models/studentStaff.utility.model");
  const StudentAttendance =sequelize.define('StudentAttendance ', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  academic_year_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  class_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  registration_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  attendance_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  in_time: {
    type: DataTypes.TIME,
    allowNull: true,
     defaultValue: DataTypes.NOW,
  },
 

  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1,
  },
  present: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0, // 0 = Absent, 1 = Present
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  updated_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  deleted_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  timestamps: false,
  underscored: true,
  freezeTableName: true,
   tableName: 'student_attendances'
     // adds deletedAt for soft tableName: 'users',deletes
});


 const StaffAttendance =sequelize.define('StaffAttendance ', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    present: {
      type: DataTypes.ENUM('1','0'),
      allowNull: false,
    },
    attendance_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    }
  }, {
  timestamps: false, // adds createdAt and updatedAt
 
   tableName: 'employee_attendances'
     // adds deletedAt for soft tableName: 'users',deletes
});

 
studentUti.hasMany(StudentAttendance, {
  foreignKey: 'registration_id',
   sourceKey: 'user_id',
  as: 'attendances',
});

StudentAttendance.belongsTo(studentUti, {
  foreignKey: 'registration_id',
   targetKey: 'user_id',
  as: 'student',
});
module.exports = {
   student: StudentAttendance,  // for student_attendances table
  staff: StaffAttendance   }