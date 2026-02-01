const express = require("express");
const router = express.Router();
const hrController = require("../controllers/hr.controller");

// Leaves
router.get("/leaves", hrController.getLeaves);
router.post("/leaves", hrController.applyLeave);
router.patch("/leaves/:id", hrController.updateLeave);

// Staff Types
router.get("/staff-types", hrController.getStaffTypes);

// Dashboard
router.get("/dashboard-stats", hrController.getDashboardStats);

// Attendance
router.get("/attendance/:employee_id", hrController.getAttendance);
router.post("/attendance", hrController.markAttendance);

// Pay Slips
router.get("/payslips", hrController.getPaySlips);
router.post("/payslips", hrController.createPaySlip);

module.exports = router;
