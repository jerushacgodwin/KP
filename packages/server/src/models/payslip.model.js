const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const PaySlip = sequelize.define(
  "PaySlip",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    employee_id: { type: DataTypes.INTEGER, allowNull: false },
    month: { type: DataTypes.STRING, allowNull: false }, // e.g., "January"
    year: { type: DataTypes.INTEGER, allowNull: false }, // e.g., 2024
    basic_salary: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    allowances: { type: DataTypes.TEXT }, // JSON string for flexibility
    deductions: { type: DataTypes.TEXT }, // JSON string
    net_salary: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    status: { type: DataTypes.STRING, defaultValue: "Unpaid" }, // Paid, Unpaid, Generated
    generated_date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    school_id: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "pay_slips",
    timestamps: true,
    underscored: true,
  }
);

PaySlip.associate = (models) => {
  PaySlip.belongsTo(models.Employee, {
    foreignKey: "employee_id",
    as: "employee",
  });
};

module.exports = PaySlip;
