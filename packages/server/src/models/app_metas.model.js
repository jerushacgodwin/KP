const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");
const appMetas = sequelize.define(
  "app_metas",
  {
     id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    meta_key: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    meta_value: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    deleted_by: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  }, {
    tableName: 'app_metas',
    timestamps: false, 
    paranoid: false, 
  }
);
appMetas.instituteForm = (parsed, files = {}) => {
  const imgFile = files.img?.[0];
  const metaValue = {
  logo: imgFile ? imgFile.filename : "logo.png", 
  school_name:parsed.school_name,
  address:parsed.address,
 
};

  return {
  meta_key: 'institute_settings',
  meta_value: JSON.stringify(metaValue),
  created_at: new Date(),
  updated_at: new Date(),
  created_by: 1,
  updated_by: 0
  };
};

module.exports = appMetas;
