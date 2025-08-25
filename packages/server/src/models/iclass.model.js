const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");
const iClass = sequelize.define(
  "iClass",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    class_teacher: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    class_leader: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    group: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "i_classes",
    timestamps: false, // or true if using createdAt/updatedAt
  }
);
iClass.associate = (models) => {
  if (models.Student) {
    iClass.hasMany(models.Student, {
      foreignKey: "class_id", // Student.class_id → iClass.class_id
      sourceKey: "class_id",
      as: "students",
    });
  }

  if (models.FeeStructure) {
    iClass.hasMany(models.FeeStructure, {
      foreignKey: "class_group", // FeeStructure.class_group → iClass.group
      sourceKey: "group",
      as: "classGroup",
    });
  }
};
module.exports = iClass;
