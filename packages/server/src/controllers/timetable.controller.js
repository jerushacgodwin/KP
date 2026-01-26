const { validationResult } = require("express-validator");
const timetable = require("../services/timetable.services");

module.exports.TimeTable = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { email, user_id } = req.body;
  //console.log(email,'email in timetable controller')
  const timeTable = await timetable.getTimetableStudent(email, user_id);
  res.status(201).json({
    message: "User created successfully",

    timetable: timeTable,
  });
};
module.exports.TimeTableStaff = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { email, user_id } = req.body;
  //console.log(email,'email in timetable controller')
  const result = await timetable.getTimetableStaff(email, user_id);
  res.status(201).json({
    message: "User created successfully",

    timetable: result,
  });
};
