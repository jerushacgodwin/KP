'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Exams
    await queryInterface.createTable('exams', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      description: { type: Sequelize.TEXT },
      exam_date: { type: Sequelize.DATE },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });

    // 2. Exam Rules
    await queryInterface.createTable('exam_rules', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      exam_id: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'exams', key: 'id' } },
      rule: { type: Sequelize.STRING(255) },
      value: { type: Sequelize.STRING(255) },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });

    // 3. Grades
    await queryInterface.createTable('grades', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(50), allowNull: false },
      min_score: { type: Sequelize.INTEGER },
      max_score: { type: Sequelize.INTEGER },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });

    // 4. Marks
    await queryInterface.createTable('marks', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      student_id: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'students', key: 'id' } },
      exam_id: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'exams', key: 'id' } },
      subject_id: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'subjects', key: 'id' } },
      grade_id: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'grades', key: 'id' } },
      score: { type: Sequelize.INTEGER },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });

    // 5. Results (summary per student per exam)
    await queryInterface.createTable('results', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      student_id: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'students', key: 'id' } },
      exam_id: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'exams', key: 'id' } },
      total_score: { type: Sequelize.INTEGER },
      grade_id: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'grades', key: 'id' } },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('results');
    await queryInterface.dropTable('marks');
    await queryInterface.dropTable('grades');
    await queryInterface.dropTable('exam_rules');
    await queryInterface.dropTable('exams');
  }
};
