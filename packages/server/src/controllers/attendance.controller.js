const attendance = require("../services/attendance.services");
const { validationResult } = require("express-validator");
const AuditService = require("../services/audit.service");

module.exports.staff = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { email } = req.body;
  const result = await attendance.getStaffAttendance(email);
  res.status(201).json({
    message: "User created successfully",
    result: result.present,
  });
};
module.exports.student = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { email, user_id } = req.body;
  const result = await attendance.getStudentAttendance(email, user_id);
  res.status(201).json({
    message: "User created successfully",
    result: result,      
  });
};
module.exports.studentAttendanceList = async (req, res, next) => {
const { classID,search, status, startDate, endDate } = req.query || {};
  const result = await attendance.getStudentAttendanceList({classID, search, status, startDate, endDate });
  res.status(201).json({
    message: "User created successfully",
   result:result,
      
  });
};
module.exports.staffAttendanceList = async (req, res, next) => {
  const { search, status, startDate, endDate } = req.query || {};
  const result = await attendance.getStaffAttendanceList({ search, status, startDate, endDate });
  res.status(201).json({
    message: "User created successfully",
    result: result,
  });
};
module.exports.setStudentAttendance = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const requests = Array.isArray(req.body) ? req.body : [req.body];
  const results = [];
  //console.log(requests, "requests in attendance controller");
  try {
    for (const request of requests) {
      const result = await attendance.setStudentAttendance(request);
      results.push(result);
    }
    res.status(201).json({
      message: "User created successfully",
      result: results,
    });
    await AuditService.logAction(req, "SET_ATTENDANCE", "ATTENDANCE", null, null, requests);
  } catch (error) {
    next(error);
  }
};

module.exports.weeklyAttendance = async (req, res, next) => {
  try {
    const result = await attendance.getWeeklyAttendance();
    res.status(200).json({
      message: "Weekly attendance fetched successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.dailyAttendance = async (req, res, next) => {
  try {
    const result = await attendance.getDailyAttendanceStats();
    res.status(200).json({
      message: "Daily attendance fetched successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.weeklyStaffAttendance = async (req, res, next) => {
  try {
    const result = await attendance.getStaffWeeklyAttendance();
    res.status(200).json({
      message: "Weekly staff attendance fetched successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.dailyStaffAttendance = async (req, res, next) => {
  try {
    const result = await attendance.getStaffDailyAttendanceStats();
    res.status(200).json({
      message: "Daily staff attendance fetched successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.monthlyAttendance = async (req, res, next) => {
  try {
    const result = await attendance.getMonthlyAttendance();
    res.status(200).json({
      message: "Monthly attendance fetched successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.monthlyStaffAttendance = async (req, res, next) => {
  try {
    const result = await attendance.getStaffMonthlyAttendance();
    res.status(200).json({
      message: "Monthly staff attendance fetched successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};
