const Student = require("../models/studentStaff.utility.model");
const Events = require("../models/event.model");
const { Op, fn, col, where } = require("sequelize");
//const currentYear = new Date().getFullYear();
module.exports.getEventList = async (email) => {
  try {
    //console.log(email, "email in event service");
    if (email) {
      const student = await Student.findOne({
        where: { email },
      });
      if (!student) {
        throw new Error("Student not found");
      }
    }
    const whereCondition = {
      event_time: {
        [Op.gte]: new Date(), // today and onwards
      },
    };

    // Only add email to the condition if it's provided
    if (email) {
      whereCondition.class_id = student.class_id; // Assuming class_id is the field to filter events for the student's class
    }

    const events = await Events.findAll({
      where: whereCondition,
    });
    return events;
  } catch (error) {
    console.error("Error fetching Event :", error);
    throw new Error("Internal server error");
  }
};
