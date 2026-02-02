const hrService = require("../services/hr.services");

// --- Leaves ---
module.exports.getLeaves = async (req, res, next) => {
  try {
    const leaves = await hrService.getAllLeaves(req.query);
    res.status(200).json({ message: "Leaves fetched successfully", result: leaves });
  } catch (err) {
    next(err);
  }
};

module.exports.applyLeave = async (req, res, next) => {
  try {
    const leave = await hrService.createLeave(req.body);
    res.status(201).json({ message: "Leave applied successfully", result: leave });
  } catch (err) {
    next(err);
  }
};

module.exports.updateLeave = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const leave = await hrService.updateLeaveStatus(id, status);
    res.status(200).json({ message: "Leave status updated successfully", result: leave });
  } catch (err) {
    next(err);
  }
};

// --- Staff Types ---
module.exports.getStaffTypes = async (req, res, next) => {
  try {
    const types = await hrService.getAllStaffTypes();
    res.status(200).json({ message: "Staff types fetched successfully", result: types });
  } catch (err) {
    next(err);
  }
};

// --- Attendance ---
module.exports.getAttendance = async (req, res, next) => {
  try {
    const { employee_id } = req.params;
    const { startDate, endDate } = req.query;
    const attendance = await hrService.getAttendanceByEmployee(employee_id, startDate, endDate);
    res.status(200).json({ message: "Attendance fetched successfully", result: attendance });
  } catch (err) {
    next(err);
  }
};

module.exports.markAttendance = async (req, res, next) => {
  try {
    const attendance = await hrService.markAttendance(req.body);
    res.status(201).json({ message: "Attendance marked successfully", result: attendance });
  } catch (err) {
    next(err);
  }
};

// --- Pay Slips ---
module.exports.getPaySlips = async (req, res, next) => {
  try {
    const paySlips = await hrService.getPaySlips(req.query);
    res.status(200).json({ message: "Pay slips fetched successfully", result: paySlips });
  } catch (err) {
    next(err);
  }
};

module.exports.createPaySlip = async (req, res, next) => {
  try {
    const paySlip = await hrService.createPaySlip(req.body);
    res.status(201).json({ message: "Pay slip created successfully", result: paySlip });
  } catch (err) {
    next(err);
  }
};

// --- Dashboard ---
module.exports.getDashboardStats = async (req, res, next) => {
  try {
    const { school_id } = req.query; // Assuming school_id is passed or extracted from user context
    const stats = await hrService.getDashboardStats(school_id);
    res.status(200).json({ message: "Dashboard stats fetched successfully", result: stats });
  } catch (err) {
      console.error(err); // Log for debug
    next(err);
  }
};
