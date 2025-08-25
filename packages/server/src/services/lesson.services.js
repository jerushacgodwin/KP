const { Op, fn, col, where } = require('sequelize');
const lessonnote= require( "../models/lessonnote.model");
module.exports.createLesson = async (data,file) => {
    try {
        //console.log("Received data:", data);
        if ( !data.chapter_title || !data.subject_id || !data.class_id) {
            throw new Error('All fields are required');
        }
        const lessonData = lessonnote.LessonNoteForm(data, file);
        //console.log("Lesson Data:", lessonData);
        const lesson = await lessonnote.create(lessonData);
        return lesson;
    } catch (error) {
        throw error;
    }
};
module.exports.getAllLessons = async (class_id, subject_id) => {
    try {
        const lessons = await lessonnote.findAll({
            attributes: ['id', 'accordion_data', 'lesson_title','chapter_title', 'subject_id', 'class_id', 'created_at'],
            where: {
                [Op.and]: [
                            { subject_id: subject_id },
                            { class_id: class_id }],
            },
            order: [['created_at', 'DESC']]
        });
        return lessons;
    } catch (error) {
        console.error("Error fetching lessons:", error);
        throw new Error("Internal server error");
    }
};