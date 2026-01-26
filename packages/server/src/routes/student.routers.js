
const express = require("express");
const multer = require('multer');
const router = express.Router();
const { body, param } = require("express-validator");
const attendanceController = require("../controllers/attendance.controller");
const timeTableController = require("../controllers/timetable.controller");
const studentController = require("../controllers/student.controller");
const lessonController = require("../controllers/lesson.controller");
const subjectController = require("../controllers/subject.controller"); 
 const iclassController = require("../controllers/Iclass.controller");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/students/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '_' + file.originalname.replace(/\s+/g, '_')),
});
const upload = multer({ storage });

router.get("/attendance/", attendanceController.studentAttendanceList);
router.post(
  "/attendance/",
  [
    body("*.class_id").notEmpty().withMessage("Invalid Class ID"),
    body("*.attendance_date").notEmpty().withMessage("Invalid Date"),
    body("*.user_id").notEmpty().withMessage("Invalid User ID"),
    body("*.present").notEmpty().withMessage("Invalid Attendance Status"),
  ],
  attendanceController.setStudentAttendance
);
router.post(
  '/addstudent',
  upload.fields([{ name: 'img' }, { name: 'birthcet' }]),
  studentController.createStudent
);
// router.post(
//   '/lessons',
//   upload.fields([{ name: 'img' }]), // File upload
//   [
//     body('*.class_id')
//       .notEmpty()
//       .withMessage('Invalid Class ID'),
//     // Add more validators if needed
//   ],
//   lessonController.createLesson
// );
router.get(
  "/subject/:class_id",
  [param("class_id").notEmpty().withMessage("Invalid classid")],
  subjectController.getSubjects
);
router.get(
  "/getlessons/:class_id",
  [param("class_id").notEmpty().withMessage("Invalid classid")],
  lessonController.getLessons
);
router.get(
  "/getlessons/:class_id/:subject_id",
  [param("class_id").notEmpty().withMessage("Invalid classid"),
   param("subject_id").notEmpty().withMessage("Invalid subjectid")],
  lessonController.getLessons
);
router.get(
  "/class/:user_id",
  [param("user_id").notEmpty().withMessage("Invalid User ID")],
  studentController.getClassIDs
);
router.get(
  "/assi/:id",
  [param("id").notEmpty().withMessage("Invalid Role")],
  attendanceController.student
);
router.get(
  "/getStudentById/:id",
  [param("id").notEmpty().withMessage("Invalid Student ID")],
  studentController.getStudentById
);
router.post(
  "/getAllStudents/",
  [body("school_id").notEmpty().withMessage("Invalid School ID"),
    body("page").isInt({ min: 0 }).withMessage("Invalid Page Number"),
    body("size").isInt({ min: 1 }).withMessage("Invalid Page Size"),
  ],
  studentController.getAllStudents
);

router.post(
  "/timetble/",
  [body("email").isEmail().withMessage("Invalid Email")],
  timeTableController.TimeTable
);
module.exports = router;
