const lessonService = require("../services/lesson.services");
const { validationResult } = require("express-validator");

module.exports.createLesson = async (req, res, next) => {      

    try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
         }

         const parsed = req.body;
         
       
        const result = await lessonService.createLesson(parsed, req.files);
        res.status(201).json({
            message: "Lesson created successfully",
            result: result,
        });
    } catch (error) {
        console.error("Error creating lesson:", error);
        res.status(500).json({ message: "Internal server error", error: error.message, stack: error.stack });
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

module.exports.updateLesson = async (req, res) => {
    try {
        const { id } = req.params;
        const parsed = req.body;
        const result = await lessonService.updateLesson(id, parsed, req.files);
        res.status(200).json({
            message: "Lesson updated successfully",
            result: result,
        });
    } catch (error) {
        console.error("Error updating lesson:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}; 

module.exports.deleteLesson = async (req, res) => {
    try {
        const { id } = req.params;
        await lessonService.deleteLesson(id);
        res.status(200).json({
            message: "Lesson deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting lesson:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}; 

