const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const BusStaff = sequelize.define(
  "BusStaff",
  {
    s_no: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id: { type: DataTypes.STRING(20), allowNull: false },
    bus_id: { type: DataTypes.STRING(20), allowNull: false },
    name: { type: DataTypes.STRING(100), allowNull: false },
    contact: { type: DataTypes.STRING(10), allowNull: false },
    role: { type: DataTypes.STRING(20), allowNull: false },
  },
  {
    tableName: "bus_staff",
    timestamps: false,
    underscored: false,
  }
);

BusStaff.associate = (models) => {
  BusStaff.belongsTo(models.Bus, {
    foreignKey: "bus_id",
    targetKey: "bus_id",
    as: "bus",
  });
};

module.exports = BusStaff;
