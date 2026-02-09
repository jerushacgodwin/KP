const Student   = require("../models/student.model");
const FeeStructure = require("../models/feestructure.model");
const iClass = require("../models/iclass.model");
const {extractAndMergeNestedData} = require("../utility/extractData");
const db = require("../models");
const { Op, col } = require("sequelize");
const {getNextSequenceValue} = require('./student.sequence.service');
const { type } = require("os");
const fieldsToExtract = [
    {
        path: ['iClass'], 
        targetField: 'class', 
        nestedFields: ['name', 'group'] 
    },
    
];
module.exports.createStudent = async (data,file)=>{
   const user_id = await getNextSequenceValue('user_id');
 const studentData = Student.studentForm(data, file);
//
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

//
//
// Handle Sorting
let orderClause = [["user_id", "ASC"]];
if (studentDetail.sortField && studentDetail.sortOrder) {
    orderClause = [[studentDetail.sortField, studentDetail.sortOrder]];
}

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
          attributes: ["amount", "due_date", "fee_type"] // Added fee_type
        }
  
  ],

  limit: sizeNum,
  subQuery: false, 
  offset,
  distinct: true, 
  order: orderClause,

});
//
     const studentData = students.rows.map(student => {
            const plainStudent = student.toJSON();
            const merged = extractAndMergeNestedData(plainStudent, fieldsToExtract);

            // Calculate Fee Breakdown
            let tuition_fee = 0;
            let exam_fee = 0;
            let other_fee = 0;
            let total_due = 0;

            if (plainStudent.feeStructures) {
                plainStudent.feeStructures.forEach(fee => {
                    const amount = parseFloat(fee.amount) || 0;
                    total_due += amount;

                    const type = (fee.fee_type || "").toLowerCase();
                    if (type.includes("tuition")) {
                        tuition_fee += amount;
                    } else if (type.includes("exam")) {
                        exam_fee += amount;
                    } else {
                        other_fee += amount;
                    }
                });
            }

            return {
                ...merged,
                tuition_fee,
                exam_fee,
                other_fee,
                total_due
            };
        });
//
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
       attributes: ['id','user_id', 'name', 'email', 'phone_no', 'class_id'] ,
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
          attributes: ["amount", "due_date", "fee_type"]
        }
      ]
    });
    return student;
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    throw error;
  }
};