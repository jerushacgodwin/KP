const { HostelRecord, HostelFee, Student, HostelAttendance, HostelLeave } = require("../models");

// --- Resident Management ---
module.exports.getAllHostelRecords = async (query) => {
  const { StudentId, Year } = query;
  const where = {};
  if (StudentId) where.StudentId = StudentId;
  if (Year) where.Year = Year;

  return await HostelRecord.findAll({
    where,
    include: [{ model: Student, as: "student", attributes: ["name"] }],
  });
};

module.exports.createHostelRecord = async (data) => {
  return await HostelRecord.create(data);
};

// --- Fee Management ---
module.exports.getHostelFees = async (query) => {
  const { ClassId, Year } = query;
  const where = {};
  if (ClassId) where.ClassId = ClassId;
  if (Year) where.Year = Year;
  return await HostelFee.findAll({ where });
};

module.exports.updateHostelFee = async (id, data) => {
  const fee = await HostelFee.findByPk(id);
  if (!fee) throw new Error("Hostel fee record not found");
  return await fee.update(data);
};

// --- Attendance ---
module.exports.createAttendance = async (data) => {
  return await HostelAttendance.create(data);
};

module.exports.getAttendance = async (query) => {
  const { student_id, date } = query;
  const where = {};
  if (student_id) where.student_id = student_id;
  if (date) where.attendance_date = date;
  
  return await HostelAttendance.findAll({
    where,
    include: [{ model: Student, as: "student", attributes: ["name"] }],
    order: [['attendance_date', 'DESC']]
  });
};

// --- Leave ---
module.exports.createLeave = async (data) => {
  return await HostelLeave.create(data);
};

module.exports.getLeaves = async (query) => {
  const { student_id, status } = query;
  const where = {};
  if (student_id) where.student_id = student_id;
  if (status) where.status = status;

  return await HostelLeave.findAll({
    where,
    include: [{ model: Student, as: "student", attributes: ["name"] }],
    order: [['created_at', 'DESC']]
  });
};
