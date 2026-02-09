const subjectService =require( "../services/subject.service.js");
exports.getSubjects = async (req, res) => {
  const class_id  = req.params.class_id;
  //
  try {
    const subject = await subjectService.getSubject(class_id);

    res.status(200).json({
      message: "Subject fetched successfully",
      result: subject,
    });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
