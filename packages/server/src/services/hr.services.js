const { Leave, StaffType, EmployeeAttendance, Employee, PaySlip } = require("../models");
const { Op } = require("sequelize");

// --- Leave Management ---
module.exports.getAllLeaves = async (query) => {
  const { school_id, employee_id, status } = query;
  const where = {};
  if (employee_id) where.employee_id = employee_id;
  if (status) where.status = status;

  return await Leave.findAll({
    where,
    include: [{ model: Employee, as: "employee", attributes: ["name", "designation"] }],
  });
};

module.exports.createLeave = async (data) => {
  return await Leave.create(data);
};

module.exports.updateLeaveStatus = async (id, status) => {
  const leave = await Leave.findByPk(id);
  if (!leave) throw new Error("Leave record not found");
  leave.status = status;
  await leave.save();
  return leave;
};

// --- Staff Type Management ---
module.exports.getAllStaffTypes = async () => {
  return await StaffType.findAll();
};

module.exports.createStaffType = async (data) => {
  return await StaffType.create(data);
};

// --- Employee Attendance ---
module.exports.getAttendanceByEmployee = async (employee_id, startDate, endDate) => {
  const where = { employee_id };
  if (startDate && endDate) {
    where.attendance_date = { [Op.between]: [startDate, endDate] };
  }
  return await EmployeeAttendance.findAll({ where });
};


module.exports.markAttendance = async (data) => {
  return await EmployeeAttendance.create(data);
};

// --- Pay Slip Management ---
module.exports.createPaySlip = async (data) => {
  return await PaySlip.create(data);
};

module.exports.getPaySlips = async (query) => {
  const { employee_id, month, year, school_id } = query;
  const where = {};
  if (employee_id) where.employee_id = employee_id;
  if (month) where.month = month;
  if (year) where.year = year;
  if (school_id) where.school_id = school_id;

  return await PaySlip.findAll({
    where,
    include: [{ model: Employee, as: "employee", attributes: ["name", "designation", "email"] }],
    order: [['created_at', 'DESC']]
  });
};

// --- Dashboard Stats ---
module.exports.getDashboardStats = async (school_id) => {
  // DEBUG: Commenting out logic to test if server crashes on load or query
  /*
  const { Student, StudentAttendance, SchoolFinance, Employee } = require("../models");
  const sequelize = require("sequelize");

  const today = new Date().toISOString().slice(0, 10);
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10);
  const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().slice(0, 10);

  // 1. Today's Attendance (Donut Chart)
  // Count total students (active)
  const totalStudents = await Student.count({ where: { school_id } }); // Assuming school_id is a filter if multi-tenant
  
  // Count present students today
  const presentStudents = await StudentAttendance.count({
    where: {
      attendance_date: today,
      present: 1 
    }
  });

  const absentStudents = await StudentAttendance.count({
    where: {
      attendance_date: today,
      present: 0
    }
  });


  // 2. This Month's Attendance (Bar Chart)
  // Aggregate by date
  // This is a simplified query. For production, you might need a generate_series approach for missing dates.
  const monthlyAttendance = await StudentAttendance.findAll({
    attributes: [
      [sequelize.fn('DATE', sequelize.col('attendance_date')), 'day'],
      [sequelize.fn('COUNT', sequelize.literal("CASE WHEN present = 1 THEN 1 END")), 'present'],
      [sequelize.fn('COUNT', sequelize.literal("CASE WHEN present = 0 THEN 1 END")), 'absent']
    ],
    where: {
      attendance_date: {
        [Op.between]: [startOfMonth, endOfMonth]
      }
    },
    group: [sequelize.fn('DATE', sequelize.col('attendance_date'))],
    order: [[sequelize.fn('DATE', sequelize.col('attendance_date')), 'ASC']]
  });

  // 3. Fees Graph (Line Chart)
  // Aggregate Income vs Expense by Month for current year
  const currentYear = new Date().getFullYear();
  const financeStats = await SchoolFinance.findAll({
      attributes: [
          [sequelize.fn('MONTHNAME', sequelize.col('date')), 'month'], // Check DB dialect (MySQL supports MONTHNAME)
          [sequelize.fn('SUM', sequelize.literal("CASE WHEN type = 'income' THEN amount ELSE 0 END")), 'income'],
          [sequelize.fn('SUM', sequelize.literal("CASE WHEN type = 'expense' THEN amount ELSE 0 END")), 'expense']
      ],
       where: {
          // school_id,
           date: {
               [Op.between]: [`${currentYear}-01-01`, `${currentYear}-12-31`]
           }
       },
       group: [sequelize.fn('MONTH', sequelize.col('date')), sequelize.fn('MONTHNAME', sequelize.col('date'))], // Group by Month Index to sort properly, rely on MONTHNAME for label
       order: [[sequelize.fn('MONTH', sequelize.col('date')), 'ASC']]
  });


  return {
    todayAttendance: {
      total: totalStudents,
      present: presentStudents,
      absent: absentStudents,
      notMarked: totalStudents - (presentStudents + absentStudents)
    },
    monthAttendance: monthlyAttendance,
    finance: financeStats
  };
  */
 return { message: "Debug Mode" };
};
