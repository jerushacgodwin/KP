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
 return { message: "Debug Mode" };
};
