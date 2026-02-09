const rols  = require('../models/staff.role.model');
module.exports.getAllRoles = async () => {
  ///
  try {
    const allClass = await rols.findAll({
     attributes: ['id', 'name'],
      where: {
    deleted_at: null
  },
      order: [['name', 'ASC']]
    });
    return allClass;
  } catch (error) {
    console.error("Error fetching timetable", error);
    throw new Error("Internal server error");
  }
};
