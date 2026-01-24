'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Academic Years
    await queryInterface.createTable('academic_years', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      school_id: { 
        type: Sequelize.STRING(20),
        allowNull: false,
        references: { model: 'schools', key: 'code' }
      },
      start_date: { type: Sequelize.DATEONLY, allowNull: false },
      end_date: { type: Sequelize.DATEONLY, allowNull: false },
      is_open_for_admission: { type: Sequelize.BOOLEAN, defaultValue: false },
      status: { type: Sequelize.ENUM('0', '1'), defaultValue: '0' },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
      deleted_at: { type: Sequelize.DATE },
      created_by: { type: Sequelize.INTEGER.UNSIGNED },
      updated_by: { type: Sequelize.INTEGER.UNSIGNED },
      deleted_by: { type: Sequelize.INTEGER.UNSIGNED }
    });

    // 2. i_classes (Classes)
    await queryInterface.createTable('i_classes', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      class_id: { type: Sequelize.INTEGER.UNSIGNED, unique: true },
      school_id: { 
        type: Sequelize.STRING(20),
        references: { model: 'schools', key: 'code' }
      },
      name: { type: Sequelize.STRING(255), allowNull: false },
      class_teacher: { type: Sequelize.INTEGER.UNSIGNED },
      class_leader: { type: Sequelize.INTEGER.UNSIGNED },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });

    // 3. Subjects
    await queryInterface.createTable('subjects', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      code: { type: Sequelize.STRING(255), allowNull: false },
      type: { type: Sequelize.ENUM('1', '2', '3'), defaultValue: '1' },
      class_id: { 
        type: Sequelize.INTEGER.UNSIGNED,
        references: { model: 'i_classes', key: 'class_id' },
        onDelete: 'CASCADE'
      },
      status: { type: Sequelize.ENUM('0', '1'), defaultValue: '1' },
      order: { type: Sequelize.SMALLINT.UNSIGNED, defaultValue: 0 },
      exclude_in_result: { type: Sequelize.BOOLEAN, defaultValue: false },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
      deleted_at: { type: Sequelize.DATE },
      created_by: { type: Sequelize.INTEGER.UNSIGNED },
      updated_by: { type: Sequelize.INTEGER.UNSIGNED },
      deleted_by: { type: Sequelize.INTEGER.UNSIGNED }
    });

    // 4. app_metas (System Settings)
    await queryInterface.createTable('app_metas', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      meta_key: { type: Sequelize.STRING(255), allowNull: false },
      meta_value: { type: Sequelize.TEXT('long') },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
      deleted_at: { type: Sequelize.DATE },
      created_by: { type: Sequelize.INTEGER.UNSIGNED },
      updated_by: { type: Sequelize.INTEGER.UNSIGNED },
      deleted_by: { type: Sequelize.INTEGER.UNSIGNED }
    });

    // 5. about_contents (CMS)
    await queryInterface.createTable('about_contents', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      why_content: { type: Sequelize.STRING(500), allowNull: false },
      key_point_1_title: { type: Sequelize.STRING(100), allowNull: false },
      key_point_1_content: { type: Sequelize.TEXT('long'), allowNull: false },
      about_us: { type: Sequelize.STRING(500), allowNull: false },
      who_we_are: { type: Sequelize.STRING(1000), allowNull: false },
      intro_video_embed_code: { type: Sequelize.TEXT, allowNull: false },
      video_site_link: { type: Sequelize.STRING(500) },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('about_contents');
    await queryInterface.dropTable('app_metas');
    await queryInterface.dropTable('subjects');
    await queryInterface.dropTable('i_classes');
    await queryInterface.dropTable('academic_years');
  }
};
