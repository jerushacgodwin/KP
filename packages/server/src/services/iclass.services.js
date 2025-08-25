const iClass  = require('../models/iclass.model');
const roleModel = require('../models/role.model');
const appMetas = require('../models/app_metas.model');
const { getNextClassSequenceValue } = require('./sequence.service');
module.exports.getAllClassesList = async () => {
  ///console.log(email, "email in timetable service");
  try {
    const allClass = await iClass.findAll({
     attributes: ['class_id', 'name', 'class_teacher', 'class_leader', 'group'],
      order: [['name', 'ASC']]
    });
    return allClass;
  } catch (error) {
    console.error("Error fetching timetable", error);
    throw new Error("Internal server error");
  }
};
module.exports.getClassById = async (classId) => {
  try {
    const classData = await iClass.findOne({
      where: { class_id: classId },
      attributes: ['class_id', 'name', 'class_teacher', 'class_leader', 'group']
    });
    if (!classData) {
      throw new Error("Class not found");
    }
    return classData;
  } catch (error) {
    console.error("Error fetching class by ID:", error);
    throw error;
  }
};
module.exports.addClass=async (classData)=>{
  const class_id = await getNextClassSequenceValue('class_id');
  try {
    const newClass = await iClass.create({
      class_id,
      ...classData
    });
    return newClass;
  } catch (error) {
    console.error("Error adding class:", error);
    throw new Error("Internal server error");
  }
}
module.exports.addRole = async (roleData) => {
  try {
    const newRole = await roleModel.create(roleData);
    return newRole;
  } catch (error) {
    console.error("Error adding role:", error);
    throw new Error("Internal server error");
  }
} 

module.exports.getSiteDetail = async () => {
  try {
    const siteDetail = await appMetas.findOne({
            where: {meta_key:'institute_settings' },
          });
    return siteDetail;
  } catch (error) {
    console.error("Error fetching site details:", error);
    throw new Error("Internal server error");
  }
}