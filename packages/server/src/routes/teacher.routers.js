const express = require("express");
const multer = require("multer");
const router = express.Router();
const { param, body } = require("express-validator");
const attendanceController = require("../controllers/attendance.controller");
const timeTableController = require("../controllers/timetable.controller");
const staffController = require("../controllers/staff.controller");
const staffRolesController=require("../controllers/staff.role.controller");
const lessonController = require("../controllers/lesson.controller");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/staff/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "_" + file.originalname.replace(/\s+/g, "_")),
});
const upload = multer({ storage });
//router.get('/staff',attendanceController.student)
router.post(
  "/attendance",
  [body("email").isEmail().withMessage("Invalid Email")],
  attendanceController.staff
);
router.post(
  "/addstaff",
  upload.fields([{ name: "img" }, { name: "resume" },{ name: "idproof" }]),
  staffController.createStaff
);
// router.post(
//   "/addstaff",
//   upload.fields([{ name: "img" }, { name: "resume" },{ name: "idproof" }]),
//   staffController.createStaff
// );
router.post(
  "/addlessons",
  [
    upload.fields([{ name: "img" }]),
    body("class_id").notEmpty().withMessage("Invalid Class ID"),
    body("subject_id").notEmpty().withMessage("Invalid Subject ID"),
    body("lesson_title").notEmpty().withMessage("Invalid Lesson Title"),
     body("accordionData").isArray({ min: 1 }).withMessage("At least one content section is required"),
    body("accordionData.*.title").notEmpty().withMessage("Title is required for each section"),
    body("accordionData.*.content").notEmpty().withMessage("Content is required for each section"),

  ],
  lessonController.createLesson
);
router.get(
  "/result/:id",
  [param("id").notEmpty().withMessage("Invalid Role")],
  attendanceController.student
);
router.get(
  "/staff/assi/:id",
  [param("id").notEmpty().withMessage("Invalid Role")],
  attendanceController.student
);
router.post(
  "/timetble",
  [body("email").isEmail().withMessage("Invalid Email")],
  timeTableController.TimeTableStaff
);
router.post(
  "/timetble",
  [body("email").isEmail().withMessage("Invalid Email")],
  timeTableController.TimeTableStaff
);
router.get('/role',staffRolesController.getAllRoles);

router.post(
  "/getAllStaff",
  [
    body("page").optional().isInt({ min: 1 }),
    body("size").optional().isInt({ min: 1 }),
  ],
  staffController.getAllStaff
);

module.exports = router;
