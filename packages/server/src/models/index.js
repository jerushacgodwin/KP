const { sequelize } = require("../db/db");

// Import models
const User = require("./user.model");
const Role = require("./role.model");
const Employee = require("./staff.model");
const Leave = require("./leave.model");
const StaffType = require("./stafftype.model");
const EmployeeAttendance = require("./employeeAttendance.model");
const Book = require("./book.model");
const BookCategory = require("./bookCategory.model");
const BookCode = require("./bookCode.model");
const LibraryRecord = require("./libraryRecord.model");
const LibraryReg = require("./libraryReg.model");
const Bus = require("./bus.model");
const BusRoot = require("./busRoot.model");
const BusStaff = require("./busStaff.model");
const HostelRecord = require("./hostelRecord.model");
const HostelFee = require("./hostelFee.model");
const Student = require("./student.model");
const iClass = require("./iclass.model");
const FeeStructure = require("./feestructure.model");
// const { student: StudentAttendance } = require("./attendance.model");
// const SchoolFinance = require("./financemodel");
// const SchoolFees = require("./schoolfees.model");
const PaySlip = require("./payslip.model");
const HostelAttendance = require("./hostelAttendance.model");
const HostelLeave = require("./hostelLeave.model");
const TransportStudent = require("./transportStudent.model");
const AuditLog = require("./auditLog.model");

const models = {
  User,
  Role,
  Employee,
  Leave,
  StaffType,
  EmployeeAttendance,
  Book,
  BookCategory,
  BookCode,
  LibraryRecord,
  LibraryReg,
  Bus,
  BusRoot,
  BusStaff,
  TransportStudent,
  HostelRecord,
  HostelFee,
  HostelAttendance,
  HostelLeave,
  Student,
  iClass,
  FeeStructure,
  PaySlip,
  AuditLog,
  // StudentAttendance,
  // SchoolFinance,
  // SchoolFees,
  // School,
};

// Run associations (if declared)
Object.keys(models).forEach((name) => {
  const model = models[name];
  if (typeof model.associate === "function") {
    model.associate(models);
    // eslint-disable-next-line no-console
    console.log(`Associated: ${name}`);
  }
});

// Export a unified db object
const db = { sequelize, ...models };
module.exports = db;
