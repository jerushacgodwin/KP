const Subjec= require( "../models/subject.model");
module.exports.getSubject = async (class_id) => {
  try {
    const subjects = await Subjec.findAll({
        attributes: ['code', 'name', 'class_id','id'],
         where: { class_id: class_id } });
    return subjects;
  } catch (error) {
    console.error("Error fetching subjects:", error);
    throw error;
  }
};
