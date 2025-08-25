const Staff = require("../models/staff.model");
const {getNextSequenceValue} = require('./staff.sequence.services');
module.exports.createStaff = async (data,file)=>{
   const user_id = await getNextSequenceValue('user_id');
 const staffData = Staff.employeeForm(data, file);

    staffData.user_id = user_id;
  //console.log(staffData, "staffData in staff service");
const created = await Staff.create(staffData);
  return created;
}