const Student   = require("../models/student.model");
const FeeStructure = require("../models/feestructure.model");
const iClass = require("../models/iclass.model");
const db = require("../models");
//const { Student, FeeStructure, iClass, Sequelize } = require("../models");
const { Op, col } = require("sequelize");
const {getNextSequenceValue} = require('./student.sequence.service');
module.exports.createStudent = async (data,file)=>{
   const user_id = await getNextSequenceValue('user_id');
 const studentData = Student.studentForm(data, file);
//console.log(studentData)
    studentData.user_id = user_id;
const created = await Student.create(studentData);
  return created;
}
module.exports.getClassIDs  = async (user_id) => {
  try {
    const student = await Student.findOne({
      attributes: ['class_id'],
      where: { user_id: user_id }
    });
    return student ? student.class_id : null;
  } catch (error) {
    console.error("Error fetching class IDs:", error);
    throw error;
  }
};
module.exports.getAllStudents = async (studentDetail) => {
  try {
    //console.log("Fetching all students with details:", studentDetail);
    const { school_id, page = 1, size = 10, search} = studentDetail;
   const pageNum = Math.max(1, parseInt(studentDetail.page, 10) || 1);
const sizeNum = Math.max(1, parseInt(studentDetail.size, 10) || 10);
const offset = (pageNum - 1) * sizeNum;
//console.log('Available models:', Object.keys(models));
  const { Student, iClass } = db;
  const whereClause = { school_id };

if (search) {
  console.log("Search term:", search);
 whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { phone_no: { [Op.like]: `%${search}%` } },
       { '$iClass.name$': { [Op.like]: `%${search}%` } }
 ]
}
// Debug: Check if iClass model has associate function

//console.log('Before association - Student associations:', Object.keys(Student.associations || {}));
//console.log('Before association - iClass associations:', Object.keys(iClass.associations || {}));
const students = await Student.findAndCountAll({
    where: {...whereClause },
  include: [
    {
      model: iClass,
      as: 'iClass',
      attributes: ['class_id', 'name', 'group'] // Include the fields you need
    },
     {
          model: db.FeeStructure,
          as: "feeStructures",
          required: false,
          attributes: ["amount", "due_date"]
        }
    // {
    //   model: School,
    //   as: 'school',
    //   attributes: ['code', 'name']
    // }
  ],

  limit: sizeNum,
  subQuery: false, 
  offset,
  distinct: true, // Ensure distinct results
  order: [["user_id", "ASC"]],
  // other options...
});
    return {
      data: students.rows,
      total: students.count,
      page: pageNum,
      size: sizeNum,
    };
// const studentsWithFees = await Student.findAll({
 
//     include: [{
//       model: FeeStructure,
//       where: { school_id },
//       attributes: ['id', 'fee_type', 'amount', 'academic_year_id'],
//     }]

// });




console.log("Students with Fee Structures:", JSON.stringify(studentsWithFees, null, 2));

  } catch (error) {
    console.error("Error fetching all students:", error);
    throw error;
  }
};
