const { sequelize } = require("../db/db");

// Import models
const Student = require("./student.model");
const iClass = require("./iclass.model");
const FeeStructure = require("./feestructure.model");

// If you add more models (School, StudentAttendance, etc.), require them here.
// const School = require("./school.model");
// const StudentAttendance = require("./studentattendance.model");

const models = {
  Student,
  iClass,
  FeeStructure,
  // School,
  // StudentAttendance,
};

// Run associations (if declared)
Object.keys(models).forEach((name) => {
  const model = models[name];
  if (typeof model.associate === "function") {
    model.associate(models);
    // eslint-disable-next-line no-console
    console.log(`Associated: ${name}`);
  }
});

// Export a unified db object
const db = { sequelize, ...models };
module.exports = db;
