const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deletable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
    created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE,
  created_by: { type: DataTypes.INTEGER },
    updated_by: { type: DataTypes.INTEGER },
    deleted_by: { type: DataTypes.INTEGER },
}, {
  tableName: 'roles',
  paranoid: true, // for soft deletes
  timestamps: true,

  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
          // enables soft deletes
  underscored: true  
});

module.exports = Role;
