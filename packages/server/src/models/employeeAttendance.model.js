const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const EmployeeAttendance = sequelize.define(
  "EmployeeAttendance",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    employee_id: { type: DataTypes.INTEGER, allowNull: false },
    attendance_date: { type: DataTypes.DATEONLY, allowNull: false },
    in_time: { type: DataTypes.DATE, allowNull: false },
    out_time: { type: DataTypes.DATE, allowNull: false },
    working_hour: { type: DataTypes.TIME, allowNull: false },
    status: { type: DataTypes.STRING(20) },
    present: {
      type: DataTypes.ENUM("0", "1"),
      defaultValue: "0",
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
    deleted_by: DataTypes.INTEGER,
  },
  {
    tableName: "employee_attendances",
    timestamps: false,
    underscored: false,
  }
);

EmployeeAttendance.associate = (models) => {
  EmployeeAttendance.belongsTo(models.Employee, {
    foreignKey: "employee_id",
    as: "employee",
  });
};

module.exports = EmployeeAttendance;
