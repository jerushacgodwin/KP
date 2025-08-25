const staffService = require("../services/staff.service");
const {schema} = require("./staff.schema");

module.exports.createStaff = async (req, res, next) => {
  try {
     //console.log(req.body, "parsed data in staff controller");
     const parsed = schema.parse(req.body);
     //console.log(parsed, "parsed data in staff controller");
   const staff = await staffService.createStaff(parsed, req.files);

    res.status(201).json({
      message: "Staff created successfully",
      result: staff, // not student.present, unless you really want only that
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
