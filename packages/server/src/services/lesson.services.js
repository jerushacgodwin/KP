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
            attributes: ['id', 'accordion_data', 'lesson_title','chapter_title', 'subject_id', 'class_id', 'created_at', 'video_urls', 'file_path'],
            where: {
                [Op.and]: [
                            ...(subject_id ? [{ subject_id: subject_id }] : []),
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

module.exports.updateLesson = async (id, data, file) => {
    try {
        const lesson = await lessonnote.findByPk(id);
        if (!lesson) {
            throw new Error('Lesson not found');
        }
        
        // Handle video_urls parsing if string
        let video_urls = [];
        if (data.video_urls) {
             try {
                video_urls = typeof data.video_urls === 'string' ? JSON.parse(data.video_urls) : data.video_urls;
             } catch (e) {
                video_urls = Array.isArray(data.video_urls) ? data.video_urls : [];
             }
        } else {
            video_urls = lesson.video_urls; // Keep existing if not provided? Or empty? Assuming merge or replace.
        }

        const updateData = {
            ...data,
            video_urls: video_urls,
            updated_at: new Date()
        };
        
        // If file is provided, update attachment
        if (file && file.img && file.img[0]) {
            updateData.attachment = file.img[0].filename;
        }

        // If file is provided, update file_path
        if (file && file.file && file.file[0]) {
             updateData.file_path = file.file[0].filename;
        }

        // Accordion data formatting similar to creating
        if (data.accordionData) {
            updateData.accordion_data = JSON.stringify(data.accordionData);
        }

        await lesson.update(updateData);
        return lesson;
    } catch (error) {
        throw error;
    }
};

module.exports.deleteLesson = async (id) => {
    try {
        const lesson = await lessonnote.findByPk(id);
        if (!lesson) {
            throw new Error('Lesson not found');
        }
        await lesson.destroy();
        return { message: "Lesson deleted successfully" };
    } catch (error) {
        throw error;
    }
};