const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const TransportStudent = sequelize.define(
  "TransportStudent",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    student_id: { type: DataTypes.INTEGER, allowNull: false },
    bus_id: { type: DataTypes.STRING(20), allowNull: false },
    root_id: { type: DataTypes.INTEGER, allowNull: false }, // BusRoot primary key is s_no
    status: { type: DataTypes.STRING, defaultValue: "Active" },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  {
    tableName: "transport_students",
    timestamps: false,
    underscored: true,
  }
);

TransportStudent.associate = (models) => {
  TransportStudent.belongsTo(models.Student, {
    foreignKey: "student_id",
    constraints: false,
    as: "student",
  });
  TransportStudent.belongsTo(models.Bus, {
    foreignKey: "bus_id",
     targetKey: "bus_id",
     constraints: false,
    as: "bus",
  });
   TransportStudent.belongsTo(models.BusRoot, {
    foreignKey: "root_id",
     targetKey: "s_no",
     constraints: false,
    as: "root",
  });
};

module.exports = TransportStudent;
