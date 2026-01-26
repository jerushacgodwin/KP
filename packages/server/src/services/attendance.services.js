const moment = require("moment");
const {
  student: studentatt,
  staff: staffatt,
} = require("../models/attendance.model");
const {
  Student: studentUti,
  Staff,
} = require("../models/studentStaff.utility.model");
const { Op, fn, col, where, literal } = require("sequelize");
const today = new Date().toISOString().split("T")[0];
module.exports.getStudentAttendance = async (email, user_id) => {
  try {
    const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
    const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");
    console.log(`AttendanceService: Date Range: ${startOfMonth} to ${endOfMonth}`);
    
    if (!email && !user_id) {
      throw new Error("All field Required");
    }
    
    let Student;
    if (user_id) {
        Student = await studentUti.findOne({ where: { user_id } });
    } else {
        Student = await studentUti.findOne({ where: { email } });
    }

    if (!Student) {
      console.log("AttendanceService: Student not found for", email || user_id);
      throw new Error("Student not found");
    }
    console.log(`AttendanceService: Found Student. UserID=${Student.user_id}, Name=${Student.name}`);
    
    const [presentCount, absentCount] = await Promise.all([
      studentatt.count({
        where: {
          registration_id: Student.user_id,
          attendance_date: { [Op.between]: [startOfMonth, endOfMonth] },
          [Op.or]: [{ present: 1 }, { present: "1" }]
        },
      }),
      studentatt.count({
        where: {
         registration_id: Student.user_id,
          attendance_date: { [Op.between]: [startOfMonth, endOfMonth] },
          [Op.or]: [{ present: 0 }, { present: "0" }]
        },
      }),
    ]);
    console.log(`AttendanceService: Counts Found - Present=${presentCount}, Absent=${absentCount}`);
    return {
      present: presentCount,
      absent: absentCount,
    };
  } catch (error) {
    console.error("Error fetching attendance counts:", error);
    throw error;
  }
};
module.exports.getStaffAttendance = async (email) => {
  try {
    if (!email) {
      throw new Error("All field Required");
    }
    const staff = await Staff.findOne({
      where: { email },
    });
    if (!staff) {
      throw new Error("Staff not found");
    }
    const present = await staffatt.findAll({
      where: {
        [Op.and]: [
          { employee_id: staff.user_id },
          { attendance_date: { [Op.between]: [startOfMonth, endOfMonth] } },
        ],
      },
    });

    return {
      present,
    };
  } catch (error) {
    console.error("Error fetching attendance counts:", error);
    throw error;
  }
};
module.exports.getStudentAttendanceList = async ({
  classID,
  search,
  status,
  startDate,
  endDate,
}) => {
  //const { search, status, startDate, endDate } = req.query;
  const searchvalue = search ? search.replace(/'/g, "") : "";
  const whereStudent = {};
  if (search) {
    whereStudent.name = {
      [Op.like]: `%${searchvalue}%`, // Sequelize safely escapes it internally
    };
  }
  if (classID) {
    whereStudent.class_id = classID;
  }
  // Attendance filter
  const whereAttendance = {
    registration_id: { [Op.col]: "student.user_id" },
  };

  if (startDate && endDate) {
    whereAttendance.attendance_date = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  } else if (startDate) {
    whereAttendance.attendance_date = {
      [Op.gte]: new Date(startDate),
    };
  } else if (endDate) {
    whereAttendance.attendance_date = {
      [Op.lte]: new Date(endDate),
    };
  } else {
      const today = new Date();
  today.setHours(0, 0, 0, 0);
    // default to today's attendance if no date is provided
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    whereAttendance.attendance_date = {
      [Op.gte]: today,
      [Op.lt]: tomorrow,
    };
  }


  if (status) {
    whereAttendance.present = status;
  }
  const studentsWithAttendance = await studentUti.findAll({
    where: whereStudent,
    attributes: ["user_id", "class_id", "name", "email"],
    include: [
      {
        model: studentatt,
        as: "attendances",
        required: false,
        where: whereAttendance,
        attributes: ["registration_id", "attendance_date", "present"],
      },
    ],
    raw: true,
  });
  return studentsWithAttendance.map((student) => (
    //console.log("Student:",  student["attendances.present"]),
    {
    
    user_id: student.user_id,
    class_id: student.class_id,
    name: student.name,
    attendance_date: student["attendances.attendance_date"] ? student["attendances.attendance_date"] : today,
    present:
    student["attendances.present"] === "1"
      ? "Present"
      : student["attendances.present"] === "0"
      ? "Absent"
      : "Not Marked",
  }));
};
module.exports.setStudentAttendance = async (data
) => {
  try {
    
     //console.log("Data received:", data);
    const { class_id, attendance_date, user_id, present } = data;
    if (!class_id || !attendance_date || !user_id || present === undefined) {
      throw new Error("All fields are required");
    }
   
    
      //throw new Error("Student not found");
    //}
    const existingAttendance = await studentatt.findOne({
      where: {
        registration_id: user_id,
        attendance_date: today,
      },
    });
    if (existingAttendance) {
      existingAttendance.present = present;
      await existingAttendance.save();
      return existingAttendance;
      
    } else {
      console.log("Creating new attendance record",present,class_id);

      const newAttendance = await studentatt.create({
        academic_year_id: 1,  
        registration_id: user_id,       
        
        attendance_date: today,
        class_id: class_id,
        present,
      });
      return newAttendance;
    }
  
  } catch (error) {
    console.error("Error setting student attendance:", error);
    throw error;
  }
};
