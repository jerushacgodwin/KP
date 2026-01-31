const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db'); // adjust path if needed
const jwt = require('jsonwebtoken')
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
school_id: { type: DataTypes.STRING, allowNull: false },
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
  timestamps: false, // adds createdAt and updatedAt
 
   tableName: 'users'
     // adds deletedAt for soft tableName: 'users',deletes
});
User.prototype.generateToken = function () {
  const payload = {
    id: this.email,
    username: this.username,
    role:this.UserRole.get('role_id')    
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET || 'secretkey', {
    expiresIn: '1d'
  });

  return token;
};


module.exports = User;
