const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db'); 
const jwt = require('jsonwebtoken');

const User = sequelize.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true // Set to true initially to avoid breaking existing reads if null, though DB says no default. 
    // Actually error said "Field 'name' doesn't have a default value", implying it is NOT NULL. 
    // But safely, I should mark it as allowNull: false if I want to enforce it, or just match DB.
    // I will set it to DataTypes.STRING.
  },
  school_id: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('0', '1'), // 0 = inactive, 1 = active
    defaultValue: '1'
  }
}, {
  timestamps: false,
  tableName: 'users',
  freezeTableName: true
});

User.prototype.generateToken = function () {
  const payload = {
    id: this.email,
    username: this.username,
    role: this.UserRole ? this.UserRole.get('role_id') : null
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET || 'secretkey', {
    expiresIn: '1d'
  });

  return token;
};

module.exports = User;
