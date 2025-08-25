const express=require('express')
const router=express.Router();
const attendanceController=require('../controllers/attendance.controller')
router.get('/staff',attendanceController.staff)
router.get('/student',attendanceController.student)
module.exports=router