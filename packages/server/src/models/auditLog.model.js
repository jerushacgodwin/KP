const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const AuditLog = sequelize.define('audit_log', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'The user who performed the action (email or username)'
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Type of action: LOGIN, CREATE, UPDATE, DELETE, etc.'
  },
  module: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'The feature area: ATTENDANCE, STUDENT, STAFF, etc.'
  },
  entity_id: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'The ID of the record being modified'
  },
  old_value: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON string of state before change'
  },
  new_value: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON string of state after change'
  },
  ip_address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  user_agent: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  tableName: 'audit_logs',
  freezeTableName: true
});

module.exports = AuditLog;
