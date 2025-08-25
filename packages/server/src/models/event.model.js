const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    event_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover_photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cover_video: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    class_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  },
  {
    tableName: "events",
    timestamps: false,
  }
);

module.exports = Event;
