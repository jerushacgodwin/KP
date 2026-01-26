const timetable = require("../models/timetable.model");
const db = require("../models");
const Student = db.Student;
const Staff = db.Staff; // Assuming Staff is also in db
// const {Student,Staff} = require("../models/studentStaff.utility.model");
// const Staff = require("../models/staff.utility.model");
module.exports.getTimetableStudent = async (email, user_id) => {
  ///console.log(email, "email in timetable service");
   try { 
    if( !email && !user_id){
        throw new Error('All field Required')
    }
    
    console.log(`TimetableService: Fetching for email=${email}, user_id=${user_id}`);
    
    const { iClass } = require("../models"); // Import iClass (or require db)
    
    let student;
    const includeOption = [{ model: iClass, as: "iClass" }];
    
    if (user_id) {
        student = await Student.findOne({ where: { user_id }, include: includeOption });
    } else {
        student = await Student.findOne({ where: { email }, include: includeOption });
    }
 
    if (student) {
      const className = student.iClass ? student.iClass.name : null;
      console.log(`TimetableService: Student found! ClassID=${student.class_id}, ClassName=${className}`);
      
      if (!className) {
          console.log("TimetableService: Class name not found for this student");
          return [];
      }

      const timeTable = await timetable.findAll({
        where: {
          class: className,
        },
      });
      console.log(`TimetableService: Found ${timeTable.length} entries for class ${className}`);
      return timeTable;
    } else {
      throw new Error("Student not found");
    }
  } catch (error) {
    console.error("Error fetching timetable", error);
    throw error;
  }
};
const { Staff: StaffUtility } = require("../models/studentStaff.utility.model");

module.exports.getTimetableStaff = async (email, user_id) => {
  try { 
    if( !email && !user_id){
        throw new Error('All field Required')
    }
    
    let staff;
    if (user_id) {
         staff = await StaffUtility.findOne({ where: { user_id } });
    } else {
         staff = await StaffUtility.findOne({ where: { email } });
    }
 
    if (staff) {
      console.log(`TimetableService (Staff): Found ${staff.name} (ID: ${staff.user_id})`);
      // The Timetable model has 'teacher' column which stores the name (String)
      const timeTable = await timetable.findAll({
        where: {
          teacher: staff.name,
        },
      });
      return timeTable;
    } else {
      console.log(`TimetableService (Staff): Staff not found for user_id=${user_id}, email=${email}. Returning empty timetable.`);
      return []; // Return empty array instead of throwing error
      // throw new Error("Staff not found");
    }
  } catch (error) {
    console.error("Error fetching timetable", error);
    throw error;
  }
};
