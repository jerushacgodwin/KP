const timetable = require("../models/timetable.model");
const {Student,Staff} = require("../models/studentStaff.utility.model");
// const Staff = require("../models/staff.utility.model");
module.exports.getTimetableStudent = async (email) => {
  ///console.log(email, "email in timetable service");
   try { 
    if( !email){
        throw new Error('All field Required')
    }const student = await Student.findOne({
    where: { email },
  });
 
    if (student) {
      const timeTable = await timetable.findAll({
        where: {
          class_id: student.class_id,
        },
      });
      return timeTable;
    } else {
      throw new Error("Student not found");
    }
  } catch (error) {
    console.error("Error fetching timetable", error);
    throw new Error("Internal server error");
  }
};
module.exports.getTimetableStaff = async (email) => {
  ///console.log(email, "email in timetable service");
   try { 
    if( !email){
        throw new Error('All field Required')
    }const staff = await Staff.findOne({
    where: { email },
  });
 
    if (staff) {
      const timeTable = await timetable.findAll({
        where: {
          staff_id: staff.user_id,
        },
      });
      return timeTable;
    } else {
      throw new Error("Student not found");
    }
  } catch (error) {
    console.error("Error fetching timetable", error);
    throw new Error("Internal server error");
  }
};
