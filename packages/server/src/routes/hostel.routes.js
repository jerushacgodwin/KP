const express = require("express");
const router = express.Router();
const hostelController = require("../controllers/hostel.controller");

// Records
router.get("/records", hostelController.getRecords);
router.post("/records", hostelController.addRecord);

// Fees
router.get("/fees", hostelController.getFees);
router.patch("/fees/:id", hostelController.updateFee);

// Attendance
router.get("/attendance", hostelController.getAttendance);
router.post("/attendance", hostelController.addAttendance);

// Leaves
router.get("/leaves", hostelController.getLeaves);
router.post("/leaves", hostelController.addLeave);

module.exports = router;
