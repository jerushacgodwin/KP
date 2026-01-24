'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Book Category
    await queryInterface.createTable('bookcategory', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });

    // 2. Book
    await queryInterface.createTable('book', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      title: { type: Sequelize.STRING(255), allowNull: false },
      author: { type: Sequelize.STRING(255) },
      category_id: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'bookcategory', key: 'id' } },
      published_at: { type: Sequelize.DATE },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });

    // 3. Buses
    await queryInterface.createTable('buses', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      bus_number: { type: Sequelize.STRING(50), allowNull: false },
      capacity: { type: Sequelize.INTEGER.UNSIGNED },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });

    // 4. Bus Root (Routes)
    await queryInterface.createTable('bus_root', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      route_name: { type: Sequelize.STRING(255), allowNull: false },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });

    // 5. Bus Staff
    await queryInterface.createTable('bus_staff', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      bus_id: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'buses', key: 'id' } },
      staff_id: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'employees', key: 'id' } },
      role: { type: Sequelize.STRING(100) },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bus_staff');
    await queryInterface.dropTable('bus_root');
    await queryInterface.dropTable('buses');
    await queryInterface.dropTable('book');
    await queryInterface.dropTable('bookcategory');
  }
};
