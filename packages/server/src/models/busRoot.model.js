const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const BusRoot = sequelize.define(
  "BusRoot",
  {
    s_no: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    bus_id: { type: DataTypes.STRING(20), allowNull: false },
    location: { type: DataTypes.STRING(255), allowNull: false },
    arrival_time: { type: DataTypes.STRING(20), allowNull: false },
    serial: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "bus_root",
    timestamps: false,
    underscored: false,
  }
);

BusRoot.associate = (models) => {
  BusRoot.belongsTo(models.Bus, {
    foreignKey: "bus_id",
    targetKey: "bus_id",
    as: "bus",
  });
};

module.exports = BusRoot;
