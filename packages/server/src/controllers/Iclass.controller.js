
const iclass = require('../services/iclass.services');
module.exports.getAllClasses = async (req, res, next) => {

  const result = await iclass.getAllClassesList();
  res.status(201).json({
    message: "User created successfully",
   result:result,
      
  });
};
module.exports.getClassById = async (req, res, next) => {
  const classId = req.params.class_id;
  const result = await iclass.getClassById(classId);
  res.status(201).json({
    message: "User created successfully",
    result: result,
  });
};
module.exports.addClass = async (req, res, next) => {
  const classData = req.body;
  try {
    const createdClass = await iclass.addClass(classData);
    res.status(201).json({
      message: "Class added successfully",
      class: createdClass,
    });
  } catch (error) {
    console.error("Error adding class:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports.addRole = async (req, res, next) => {
  const roleData = req.body;
  try {
    const createdRole = await iclass.addRole(roleData);
    res.status(201).json({
      message: "Role added successfully",
      role: createdRole,
    });
  } catch (error) {
    console.error("Error adding role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports.addClassTeacher = async (req, res, next) => {
  const { class_id, teacher_id } = req.body;
  try {
    // Logic to add class teacher
    // Assuming iclass.addClassTeacher is implemented
    const result = await iclass.addClassTeacher(class_id, teacher_id);
    res.status(201).json({
      message: "Class teacher added successfully",
      result: result,
    });
  } catch (error) {
    console.error("Error adding class teacher:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports.getSiteDetail = async (req, res, next) => {
  //console.log(req)
  try {

    // Logic to get site details
    // Assuming iclass.getSiteDetail is implemented
    const siteDetail = await iclass.getSiteDetail();
    res.status(200).json({
      message: "Site details fetched successfully",
      siteDetail: siteDetail,
    });
  } catch (error) {
    console.error("Error fetching site details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};