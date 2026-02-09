const Staff = require("../models/staff.model");
const {getNextSequenceValue} = require('./staff.sequence.services');
module.exports.createStaff = async (data,file)=>{
   const user_id = await getNextSequenceValue('user_id');
 const staffData = Staff.employeeForm(data, file);

    staffData.user_id = user_id;
  //
const created = await Staff.create(staffData);
  return created;
}

module.exports.getAllStaff = async (staffDetail) => {
  try {
    const { page = 1, size = 10, search } = staffDetail;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const sizeNum = Math.max(1, parseInt(size, 10) || 10);
    const offset = (pageNum - 1) * sizeNum;
    
    const { Op } = require("sequelize");
    const whereClause = { status: "1" }; // Assuming 1 is active

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { phone_no: { [Op.like]: `%${search}%` } },
      ];
    }

    const start = await Staff.findAndCountAll({
      where: whereClause,
      attributes: ['id', 'user_id', 'name', 'email', 'phone_no', 'photo', 'specialized_in', 'designation', 'address'],
      limit: sizeNum,
      offset: offset,
      order: [["name", "ASC"]],
    });

    return {
      data: start.rows,
      total: start.count,
      page: pageNum,
      size: sizeNum,
    };
  } catch (error) {
    console.error("Error fetching all staff:", error);
    throw new Error("Internal server error");
  }
};