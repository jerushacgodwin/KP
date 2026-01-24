const studentService = require("../services/student.services");
const {schema} = require("./student.schema");

module.exports.createStudent = async (req, res, next) => {
  try {
    //console.log( req.files)
    // Validate input using Zod
    const parsed = schema.parse(req.body);

    // Create student using the service
    const student = await studentService.createStudent(parsed, req.files);

    res.status(201).json({
      message: "Student created successfully",
      result: student, // not student.present, unless you really want only that
    });
  } catch (err) {
    // Handle zod validation errors
    if (err.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: err.errors,
      });
    }

    // Log error & forward to global error handler
    console.error("Create Student Error:", err);
    next(err);
  }
};
module.exports.getClassIDs = async (req, res, next) => {
  try {
    const classIDs = await studentService.getClassIDs(req.params.user_id);
    res.status(200).json({
      message: "Class IDs fetched successfully",
      result: classIDs,
    });
  } catch (err) {
    console.error("Get Class IDs Error:", err);
    next(err);
  }
};
module.exports.getAllStudents = async (req, res, next) => {
  try {
    const studentDetail = req.body;
    const students = await studentService.getAllStudents(studentDetail);
    res.status(200).json({
      message: "All students fetched successfully",
      result: students,
    });
  } catch (err) {
    console.error("Get All Students Error:", err);
    next(err);
  }
};
module.exports.getStudentById = async (req, res, next) => {
  
  try {
    const studentId = req.params.id;
    const student = await studentService.getStudentById(studentId);
    res.status(200).json({
      message: "Student fetched successfully",
      result: student,
    });
  } catch (err) {
    console.error("Get Student By ID Error:", err);
    next(err);
  }
};