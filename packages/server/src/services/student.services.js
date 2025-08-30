const Student   = require("../models/student.model");
const FeeStructure = require("../models/feestructure.model");
const iClass = require("../models/iclass.model");
const {extractAndMergeNestedData} = require("../utility/extractData");
const db = require("../models");
const { Op, col } = require("sequelize");
const {getNextSequenceValue} = require('./student.sequence.service');
const fieldsToExtract = [
    {
        path: ['iClass'], 
        targetField: 'class', 
        nestedFields: ['name', 'group'] 
    },
    {
        path: ['feeStructures'], 
        targetField: 'fee',
        nestedFields: ['amount', 'due_date'] 
    }
];
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
    const { school_id, page = 1, size = 10, search} = studentDetail;
   const pageNum = Math.max(1, parseInt(studentDetail.page, 10) || 1);
const sizeNum = Math.max(1, parseInt(studentDetail.size, 10) || 10);
const offset = (pageNum - 1) * sizeNum;
  const { Student, iClass } = db;
  const whereClause = { school_id };

if (search) {

 whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { phone_no: { [Op.like]: `%${search}%` } },
       { '$iClass.name$': { [Op.like]: `%${search}%` } }
 ]
}

//console.log('Before association - Student associations:', Object.keys(Student.associations || {}));
//console.log('Before association - iClass associations:', Object.keys(iClass.associations || {}));
const students = await Student.findAndCountAll({
    where: {...whereClause },
    attributes: ['id','user_id', 'name', 'email', 'phone_no', 'class_id'] ,
  include: [
    {
      model: iClass,
      as: 'iClass',
      attributes: ['class_id', 'name', 'group'] 
    },
     {
          model: db.FeeStructure,
          as: "feeStructures",         
          attributes: ["amount", "due_date"]
        }
  
  ],

  limit: sizeNum,
  subQuery: false, 
  offset,
  distinct: true, 
  order: [["user_id", "ASC"]],

});
//console.log('Students fetched:', students.rows[0].feeStructures);
     const studentData = students.rows.map(student => {
            return extractAndMergeNestedData(student.toJSON(), fieldsToExtract); // .toJSON() to get plain object
        });
//console.log('Extracted Student Data:', studentData);
    return {
      data: studentData,
      total: students.count,
      page: pageNum,
      size: sizeNum,
    };

  } catch (error) {
    console.error("Error fetching all students:", error);
    throw error;
  }
};
module.exports.getStudentById = async (studentId) => {
    const { Student, iClass } = db;
  try {
    const student = await Student.findOne({
      where: { user_id: studentId },
      include: [
        {
          model: db.iClass,
          as: "iClass",
          attributes: ['class_id', 'name', 'group'] 
        },
         {
          model: db.FeeStructure,
          as: "feeStructures",
          required: false,
          attributes: ["amount", "due_date"]
        }
      ]
    });
    return student;
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    throw error;
  }
};