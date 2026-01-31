const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const HostelFee = sequelize.define(
  "HostelFee",
  {
    InstituteId: { type: DataTypes.INTEGER },
    HostelFeeId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ClassId: { type: DataTypes.STRING(3) },
    HostelFees: { type: DataTypes.DOUBLE(10, 2) },
    Year: { type: DataTypes.STRING(10) },
  },
  {
    tableName: "hostelfees",
    timestamps: false,
    underscored: false,
  }
);

module.exports = HostelFee;
