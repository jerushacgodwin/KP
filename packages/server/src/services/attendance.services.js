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
            throw new Error("Student not found");
    }
        
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
        return {
      present: presentCount,
      absent: absentCount,
    };
  } catch (error) {
    console.error("Error fetching attendance counts:", error);
    throw error;
  }
};

module.exports.getWeeklyAttendance = async () => {
  try {
    const startOfWeek = moment().startOf("isoWeek").format("YYYY-MM-DD");
    const endOfWeek = moment().endOf("isoWeek").format("YYYY-MM-DD");

    
    const results = await studentatt.findAll({
      attributes: [
        [fn("DATE_FORMAT", col("attendance_date"), "%a"), "day"],
        [fn("SUM", literal("CASE WHEN present = '1' THEN 1 ELSE 0 END")), "present"],
        [fn("SUM", literal("CASE WHEN present = '0' THEN 1 ELSE 0 END")), "absent"],
      ],
      where: {
        attendance_date: {
          [Op.between]: [startOfWeek, endOfWeek],
        },
      },
      group: ["day"],
      order: [["attendance_date", "ASC"]],
    });

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const formattedData = days.map((day) => {
      const found = results.find((r) => r.get("day") === day);
      return {
        name: day,
        present: found ? parseInt(found.get("present")) : 0,
        absent: found ? parseInt(found.get("absent")) : 0,
      };
    });

    return formattedData;
  } catch (error) {
    console.error("Error fetching student weekly attendance:", error);
    throw new Error("Internal server error");
  }
};

module.exports.getDailyAttendanceStats = async () => {
  try {
    const todayDate = moment().format("YYYY-MM-DD");
    
    // Count total students
    const totalStudents = await studentUti.count();

    const [presentCount, absentCount] = await Promise.all([
      studentatt.count({
        where: {
          attendance_date: todayDate,
          [Op.or]: [{ present: 1 }, { present: "1" }],
        },
      }),
      studentatt.count({
        where: {
          attendance_date: todayDate,
          [Op.or]: [{ present: 0 }, { present: "0" }],
        },
      }),
    ]);

    return [
      { name: "Total", count: totalStudents, fill: "white" },
      { name: "Present", count: presentCount, fill: "#FAE27C" },
      { name: "Absent", count: absentCount, fill: "#C3EBFA" },
    ];
  } catch (error) {
    console.error("Error fetching student daily attendance stats:", error);
    throw new Error("Internal server error");
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
    //,
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
    
     //
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

module.exports.getStaffWeeklyAttendance = async () => {
  try {
    const startOfWeek = moment().startOf("isoWeek").format("YYYY-MM-DD");
    const endOfWeek = moment().endOf("isoWeek").format("YYYY-MM-DD");

    
    const results = await staffatt.findAll({
      attributes: [
        [fn("DATE_FORMAT", col("attendance_date"), "%a"), "day"], // Mon, Tue, Wed
        [fn("SUM", literal("CASE WHEN present = '1' THEN 1 ELSE 0 END")), "present"],
        [fn("SUM", literal("CASE WHEN present = '0' THEN 1 ELSE 0 END")), "absent"],
      ],
      where: {
        attendance_date: {
          [Op.between]: [startOfWeek, endOfWeek],
        },
      },
      group: ["day"],
      order: [["attendance_date", "ASC"]],
    });

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const formattedData = days.map((day) => {
      const found = results.find((r) => r.get("day") === day);
      return {
        name: day,
        present: found ? parseInt(found.get("present")) : 0,
        absent: found ? parseInt(found.get("absent")) : 0,
      };
    });

    return formattedData;
  } catch (error) {
    console.error("Error fetching staff weekly attendance:", error);
    throw new Error("Internal server error");
  }
};

module.exports.getStaffDailyAttendanceStats = async () => {
  try {
    const todayDate = moment().format("YYYY-MM-DD");
    
    // Count total staff
    const totalStaff = await Staff.count();

    const [presentCount, absentCount] = await Promise.all([
      staffatt.count({
        where: {
          attendance_date: todayDate,
          [Op.or]: [{ present: 1 }, { present: "1" }],
        },
      }),
      staffatt.count({
        where: {
          attendance_date: todayDate,
          [Op.or]: [{ present: 0 }, { present: "0" }],
        },
      }),
    ]);

    return [
      { name: "Total", count: totalStaff, fill: "white" },
      { name: "Present", count: presentCount, fill: "#FAE27C" },
      { name: "Absent", count: absentCount, fill: "#C3EBFA" },
    ];
  } catch (error) {
    console.error("Error fetching staff daily attendance stats:", error);
    throw new Error("Internal server error");
  }
};

module.exports.getMonthlyAttendance = async () => {
  try {
    const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
    const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");

    
    const results = await studentatt.findAll({
      attributes: [
        [fn("DATE_FORMAT", col("attendance_date"), "%d"), "day"],
        [fn("SUM", literal("CASE WHEN present = '1' THEN 1 ELSE 0 END")), "present"],
        [fn("SUM", literal("CASE WHEN present = '0' THEN 1 ELSE 0 END")), "absent"],
      ],
      where: {
        attendance_date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
      group: ["day"],
      order: [["attendance_date", "ASC"]],
    });

    const daysInMonth = moment().daysInMonth();
    const formattedData = [];

    for (let i = 1; i <= daysInMonth; i++) {
        const dayStr = i.toString().padStart(2, '0');
        const found = results.find((r) => r.get("day") === dayStr);
        formattedData.push({
            name: i.toString(),
            present: found ? parseInt(found.get("present")) : 0,
            absent: found ? parseInt(found.get("absent")) : 0,
        });
    }

    return formattedData;
  } catch (error) {
    console.error("Error fetching monthly attendance:", error);
    throw new Error("Internal server error");
  }
};

module.exports.getStaffMonthlyAttendance = async () => {
  try {
    const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
    const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");

    
    const results = await staffatt.findAll({
      attributes: [
        [fn("DATE_FORMAT", col("attendance_date"), "%d"), "day"],
        [fn("SUM", literal("CASE WHEN present = '1' THEN 1 ELSE 0 END")), "present"],
        [fn("SUM", literal("CASE WHEN present = '0' THEN 1 ELSE 0 END")), "absent"],
      ],
      where: {
        attendance_date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
      group: ["day"],
      order: [["attendance_date", "ASC"]],
    });

    const daysInMonth = moment().daysInMonth();
    const formattedData = [];

    for (let i = 1; i <= daysInMonth; i++) {
        const dayStr = i.toString().padStart(2, '0');
        const found = results.find((r) => r.get("day") === dayStr);
        formattedData.push({
            name: i.toString(),
            present: found ? parseInt(found.get("present")) : 0,
            absent: found ? parseInt(found.get("absent")) : 0,
        });
    }

    return formattedData;
  } catch (error) {
    console.error("Error fetching staff monthly attendance:", error);
    throw new Error("Internal server error");
  }
};
