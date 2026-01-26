const { Student } = require("../models/studentStaff.utility.model");
const Events = require("../models/event.model");
const { Op, fn, col, where } = require("sequelize");

console.log("EventServices: Student Model Import:", Student ? "Found" : "Missing", "Is Model:", !!Student?.findOne);

//const currentYear = new Date().getFullYear();
module.exports.getEventList = async (email, role, user_id) => {
  try {
    //console.log(email, "email in event service");
    const whereCondition = {
      // event_time: {
      //   [Op.gte]: new Date(), // today and onwards
      // },
    };

    // If Admin (1) or Teacher (2), return ALL events (no filtering)
    if (role === 1 || role === 2 || role === '1' || role === '2') {
        // No additional filtering needed
    } else if (email || user_id) {
       // logic for student filtering
       // ... existing code ...
      console.log(`Fetching student for email: ${email}, user_id: ${user_id}`);
      
      let student;
      if (user_id) {
          student = await Student.findOne({ where: { user_id } });
      } else {
          student = await Student.findOne({ where: { email } });
      }
      if (!student) {
        console.error("Student not found for email:", email);
        // Fallback: If not a student (e.g. admin testing), maybe show all or just global?
        // Let's just return global events if student not found, rather than crashing
        // throw new Error("Student not found"); 
         whereCondition.class_id = null; // Show only global events if student profile missing
      } else {
         console.log("Student found:", student.id, "Class:", student.class_id, "Type:", typeof student.class_id);
         
         const classId = student.class_id;
         whereCondition[Op.or] = [
            { class_id: classId },
            // Also try casting to number/string if needed, or just let Sequelize handle it.
            // But let's be explicit and allow null.
            { class_id: null }
         ];
      }
    }

    // const fs = require('fs');
    // const path = require('path');
    
    console.log(`Fetching events for: ${email}, Role: ${role}`); 

    const events = await Events.findAll({
      where: whereCondition,
    });
    console.log("Found events:", events.length);
    if (email) {
         console.log(`Where Condition: ${JSON.stringify(whereCondition)}`);
    }
    return events;
  } catch (error) {
    console.error("Error fetching Event :", error);
    throw error; // Throw original error to see it in controller/frontend
  }
};

module.exports.createEvent = async (eventData) => {
  try {
    const event = await Events.create(eventData);
    return event;
  } catch (error) {
    console.error("Error creating Event :", error);
    throw new Error("Internal server error");
  }
};

module.exports.deleteEvent = async (id) => {
  try {
    const event = await Events.destroy({
      where: { id },
    });
    return event;
  } catch (error) {
    console.error("Error deleting Event :", error);
    throw new Error("Internal server error");
  }
};
