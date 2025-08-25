const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const iclassController = require("../controllers/Iclass.controller");
router.get("/", iclassController.getAllClasses);

router.get("/getsite", iclassController.getSiteDetail);
router.get("/:class_id", iclassController.getClassById);
router.post(
  "/addClass",
  [
    body("name").notEmpty().withMessage("Class name is required"),
    body("group").notEmpty().withMessage("Group is required"),
  ],
  iclassController.addClass
);
router.post(
  "/addRole",
  [body("name").notEmpty().withMessage("Role is required")],
  iclassController.addRole
);
router.post(
  "/addClassTeacher",
  [
    body("class_id").notEmpty().withMessage("Class ID is required"),
    body("teacher_id").notEmpty().withMessage("Teacher ID is required"),
  ],
  iclassController.addClassTeacher
);

module.exports = router;
