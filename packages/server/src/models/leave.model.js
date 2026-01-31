const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const Leave = sequelize.define(
  "Leave",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    employee_id: { type: DataTypes.INTEGER, allowNull: false },
    leave_type: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      defaultValue: "1",
    },
    leave_date: { type: DataTypes.DATEONLY, allowNull: false },
    document: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    status: {
      type: DataTypes.ENUM("1", "2", "3"),
      defaultValue: "1",
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
    deleted_by: DataTypes.INTEGER,
  },
  {
    tableName: "leaves",
    timestamps: false,
    underscored: false,
  }
);

Leave.associate = (models) => {
  Leave.belongsTo(models.Employee, {
    foreignKey: "employee_id",
    as: "employee",
  });
};

module.exports = Leave;
