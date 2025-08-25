const lessonService = require("../services/lesson.services");
module.exports.createLesson = async (req, res, next) => {      

    try {
         const parsed = req.body;
         
       
        const result = await lessonService.createLesson(parsed, req.files);
        res.status(201).json({
            message: "Lesson created successfully",
            result: result,
        });
    } catch (error) {
        console.error("Error creating lesson:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}; 
module.exports.getLessons = async (req, res) => {
    try {
       const { class_id, subject_id } = req.params;
       const classId = parseInt(class_id, 10);
       const subjectId = parseInt(subject_id, 10);
        const lessons = await lessonService.getAllLessons(classId, subjectId);
        res.status(200).json({
            message: "Lessons fetched successfully",
            result: lessons,
        });
    } catch (error) {
        console.error("Error fetching lessons:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}; 

