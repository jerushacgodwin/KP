const express = require("express");
const router = express.Router();
const hrController = require("../controllers/hr.controller");

// Leaves
router.get("/leaves", hrController.getLeaves);
router.post("/leaves", hrController.applyLeave);
router.patch("/leaves/:id", hrController.updateLeave);

// Staff Types
router.get("/staff-types", hrController.getStaffTypes);

// Attendance
router.get("/attendance/:employee_id", hrController.getAttendance);
router.post("/attendance", hrController.markAttendance);

module.exports = router;
