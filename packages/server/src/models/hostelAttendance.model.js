const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const HostelAttendance = sequelize.define(
  "HostelAttendance",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    student_id: { type: DataTypes.INTEGER, allowNull: false },
    attendance_date: { type: DataTypes.DATEONLY, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: "Present" }, // Present, Absent, Late
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  {
    tableName: "hostel_attendance",
    timestamps: false,
    underscored: true,
  }
);

HostelAttendance.associate = (models) => {
  HostelAttendance.belongsTo(models.Student, {
    foreignKey: "student_id",
     constraints: false, // Disable FK constraint creation in DB
    as: "student",
  });
};

module.exports = HostelAttendance;
