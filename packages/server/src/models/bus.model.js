const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const Bus = sequelize.define(
  "Bus",
  {
    s_no: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    bus_id: { type: DataTypes.STRING(20), allowNull: false },
    bus_title: { type: DataTypes.STRING(100), allowNull: false },
    bus_number: { type: DataTypes.STRING(20), allowNull: false },
    request: { type: DataTypes.STRING(11), allowNull: false },
  },
  {
    tableName: "buses",
    timestamps: false,
    underscored: false,
  }
);

Bus.associate = (models) => {
  Bus.hasMany(models.BusRoot, {
    foreignKey: "bus_id",
    sourceKey: "bus_id",
    as: "roots",
  });
  Bus.hasMany(models.BusStaff, {
    foreignKey: "bus_id",
    sourceKey: "bus_id",
    as: "staff",
  });
};

module.exports = Bus;
