const { HostelRecord, HostelFee, Student } = require("../models");

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
