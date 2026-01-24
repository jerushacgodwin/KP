const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const FeeType = sequelize.define(
  "FeeType",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "fee_types",
    timestamps: false, // We are manually managing timestamps
    underscored: true, // Ensures snake_case fields
  }
);

// Optional: helper to create a new fee type
FeeType.createFeeType = (data) => ({
  name: data.name,
  description: data.description || null,
  is_active: data.is_active ?? 1,
  created_at: new Date(),
  updated_at: new Date(),
});

module.exports = FeeType;
