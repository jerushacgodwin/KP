'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Schools Table
    await queryInterface.createTable('schools', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      code: { type: Sequelize.STRING(20), unique: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      address: { type: Sequelize.STRING(500) },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });

    // 2. Roles Table
    await queryInterface.createTable('roles', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(100), allowNull: false },
      description: { type: Sequelize.STRING(255) },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });

    // 3. Permissions Table
    await queryInterface.createTable('permissions', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(100), allowNull: false },
      description: { type: Sequelize.STRING(255) },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });

    // 4. Users Table
    await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      username: { type: Sequelize.STRING(100), unique: true },
      email: { type: Sequelize.STRING(255), unique: true },
      password: { type: Sequelize.STRING(255) },
      role_id: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'roles', key: 'id' } },
      school_id: { type: Sequelize.STRING(20), references: { model: 'schools', key: 'code' } },
      status: { type: Sequelize.ENUM('0', '1'), defaultValue: '1' },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });

    // 5. Role-Permissions Junction Table
    await queryInterface.createTable('roles_permissions', {
      role_id: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'roles', key: 'id' } },
      permission_id: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'permissions', key: 'id' } },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });

    // 6. User-Roles Junction Table
    await queryInterface.createTable('user_roles', {
      user_id: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'users', key: 'id' } },
      role_id: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'roles', key: 'id' } },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_roles');
    await queryInterface.dropTable('roles_permissions');
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('permissions');
    await queryInterface.dropTable('roles');
    await queryInterface.dropTable('schools');
  }
};
