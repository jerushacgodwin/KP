const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const HostelLeave = sequelize.define(
  "HostelLeave",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    student_id: { type: DataTypes.INTEGER, allowNull: false },
    from_date: { type: DataTypes.DATEONLY, allowNull: false },
    to_date: { type: DataTypes.DATEONLY, allowNull: false },
    reason: { type: DataTypes.TEXT },
    status: { type: DataTypes.STRING, defaultValue: "Pending" }, // Pending, Approved, Rejected
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  {
    tableName: "hostel_leaves",
    timestamps: false,
    underscored: true,
  }
);

HostelLeave.associate = (models) => {
  HostelLeave.belongsTo(models.Student, {
    foreignKey: "student_id",
     constraints: false, // Disable FK constraint creation in DB
    as: "student",
  });
};

module.exports = HostelLeave;
