'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Employees Table
    await queryInterface.createTable('employees', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      user_id: { 
        type: Sequelize.INTEGER.UNSIGNED,
        unique: true,
        references: { model: 'users', key: 'id' }
      },
      school_id: { 
        type: Sequelize.STRING(20),
        allowNull: false,
        references: { model: 'schools', key: 'code' }
      },
      role_id: { 
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: 'roles', key: 'id' }
      },
      name: { type: Sequelize.STRING(255), allowNull: false },
      qualification: { type: Sequelize.STRING(255) },
      experience: { type: Sequelize.STRING(250), allowNull: false },
      dob: { type: Sequelize.STRING(10), allowNull: false },
      gender: { type: Sequelize.ENUM('1', '2'), defaultValue: '1' },
      religion: { type: Sequelize.STRING(250), allowNull: false },
      cast: { type: Sequelize.STRING(250), allowNull: false },
      email: { type: Sequelize.STRING(100) },
      phone_no: { type: Sequelize.STRING(15) },
      address: { type: Sequelize.STRING(500) },
      joining_date: { type: Sequelize.DATEONLY, allowNull: false },
      designation: { type: Sequelize.STRING(250), allowNull: false },
      status: { type: Sequelize.ENUM('0', '1'), defaultValue: '1' },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
      deleted_at: { type: Sequelize.DATE },
      created_by: { type: Sequelize.INTEGER.UNSIGNED },
      updated_by: { type: Sequelize.INTEGER.UNSIGNED },
      deleted_by: { type: Sequelize.INTEGER.UNSIGNED }
    });

    // 2. Students Table
    await queryInterface.createTable('students', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      user_id: { 
        type: Sequelize.INTEGER.UNSIGNED, 
        unique: true,
        references: { model: 'users', key: 'id' }
      },
      school_id: { 
        type: Sequelize.STRING(20),
        references: { model: 'schools', key: 'code' }
      },
      class_id: { 
        type: Sequelize.INTEGER.UNSIGNED,
        references: { model: 'i_classes', key: 'class_id' }
      },
      name: { type: Sequelize.STRING(255), allowNull: false },
      dob: { type: Sequelize.DATEONLY },
      gender: { type: Sequelize.ENUM('1', '2') },
      religion: { type: Sequelize.STRING(250) },
      blood_group: { type: Sequelize.STRING(10) },
      father_name: { type: Sequelize.STRING(255) },
      mother_name: { type: Sequelize.STRING(255) },
      phone_no: { type: Sequelize.STRING(15) },
      address: { type: Sequelize.STRING(500) },
      status: { type: Sequelize.ENUM('0', '1'), defaultValue: '1' },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
      deleted_at: { type: Sequelize.DATE },
      created_by: { type: Sequelize.INTEGER.UNSIGNED },
      updated_by: { type: Sequelize.INTEGER.UNSIGNED },
      deleted_by: { type: Sequelize.INTEGER.UNSIGNED }
    });

    // 3. Employee Attendances
    await queryInterface.createTable('employee_attendances', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      employee_id: { 
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: 'employees', key: 'id' }
      },
      attendance_date: { type: Sequelize.DATEONLY, allowNull: false },
      in_time: { type: Sequelize.DATE },
      out_time: { type: Sequelize.DATE },
      working_hour: { type: Sequelize.TIME },
      status: { type: Sequelize.STRING(20) },
      present: { type: Sequelize.ENUM('0', '1'), defaultValue: '0' },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('employee_attendances');
    await queryInterface.dropTable('students');
    await queryInterface.dropTable('employees');
  }
};
