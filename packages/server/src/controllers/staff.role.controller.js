
const roles = require('../services/staff.role.services');
module.exports.getAllRoles = async (req, res, next) => {

  const result = await roles.getAllRoles();
  res.status(201).json({
    message: "User created successfully",
   result:result,
      
  });
};