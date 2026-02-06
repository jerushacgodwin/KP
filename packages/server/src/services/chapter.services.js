const { Op } = require('sequelize');
const Chapter = require('../models/chapter.model');
const LessonNote = require('../models/lessonnote.model');

module.exports.getChapters = async (class_id, subject_id) => {
    try {
        // Fetch chapters from the new table
        const chapters = await Chapter.findAll({
            where: {
                class_id: class_id,
                subject_id: subject_id
            },
            order: [['created_at', 'ASC']] // or by order if added later
        });

        // Also fetch lessons to get distinct "chapter_title"s that might not be in the chapters table yet (legacy support)
        // Actually, for this task, let's focus on the "Chapters" table being the source of truth for the NEW UI.
        // But we need to ensure we don't lose access to lessons if chapters aren't created in the new table yet.
        // STRATEGY: 
        // 1. Get all chapters from `chapters` table.
        // 2. Get all distinct `chapter_title` from `lesson_notes` table for this class/subject.
        // 3. Merge them?
        //    - If a lesson has a `chapter_title` that matches a `Chapter.title`, great.
        //    - If a lesson has a `chapter_title` that implies a chapter NOT in `chapters` table, we should probably show it as a "Legacy Chapter" or just list it.
        //    - Ideally, we should auto-migrate on fetch or just be robust.
        
        // For the purpose of "list all chapters", if the lessons are not linked to a chapter row, the student won't see description.
        // Let's stick to returning `Chapter` rows.
        // If the user wants to populate this, they need to run a migration script or we do it lazily.
        // Since I can't easily run a one-off script on the user's DB right now without their approval/context, maybe I should do a "Lazy Migration" check here?
        // Or just rely on the migration step I will run next (I can create a data migration script).

        // Let's create a data migration step in the `up` migration file! That's better.
        // So here, just return what's in the table.
        return chapters;

    } catch (error) {
        throw error;
    }
};
