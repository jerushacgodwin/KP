const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('chapters', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      class_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'i_classes', // Check if this is the correct table name, based on iClass model
          key: 'class_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      subject_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'subjects',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // DATA MIGRATION: Populate chapters from existing lesson_notes
    try {
        const [results] = await queryInterface.sequelize.query(
          `SELECT DISTINCT class_id, subject_id, chapter_title FROM lesson_notes WHERE chapter_title IS NOT NULL AND chapter_title != ''`
        );
        
        if (results && results.length > 0) {
           const chaptersToInsert = results.map(row => ({
               class_id: row.class_id,
               subject_id: row.subject_id,
               title: row.chapter_title,
               description: '', // Default empty description
               created_at: new Date(),
               updated_at: new Date()
           }));
           
           // Insert using bulkInsert (ignore duplicates if any logic was strict, but here we just created table so it's empty)
           await queryInterface.bulkInsert('chapters', chaptersToInsert);
           console.log(`Migrated ${chaptersToInsert.length} chapters from existing lessons.`);
        }
    } catch (err) {
        console.error("Data migration for chapters failed (non-fatal):", err);
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('chapters');
  }
};
