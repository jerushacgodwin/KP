const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');
module.exports.getNextSequenceValue=async(sequenceName)=> {
  const transaction = await sequelize.transaction();
  try {
    const [updated] = await sequelize.query(
      `
      UPDATE employees_sequences
      SET current_value = LAST_INSERT_ID(current_value + 1)
      WHERE name = :sequenceName
      `,
      {
        replacements: { sequenceName },
        transaction,
      }
    );

    const [result] = await sequelize.query(
      `SELECT LAST_INSERT_ID() AS nextVal`,
      { transaction }
    );

    await transaction.commit();

    return result[0].nextVal;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
