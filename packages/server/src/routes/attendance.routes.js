const express=require('express')
const router=express.Router();
const attendanceController=require('../controllers/attendance.controller')
router.get('/staff',attendanceController.staff)
router.get('/student',attendanceController.student)
router.get('/weekly', attendanceController.weeklyAttendance);
router.get('/daily', attendanceController.dailyAttendance);
router.get('/monthly', attendanceController.monthlyAttendance);
router.get('/staff/weekly', attendanceController.weeklyStaffAttendance);
router.get('/staff/daily', attendanceController.dailyStaffAttendance);
router.get('/staff/monthly', attendanceController.monthlyStaffAttendance);
module.exports=router