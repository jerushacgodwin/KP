const chapterService = require('../services/chapter.services');

module.exports.getChapters = async (req, res) => {
    try {
        const { class_id, subject_id } = req.params;
        const result = await chapterService.getChapters(class_id, subject_id);
        res.status(200).json({ status: "OK", result });
    } catch (error) {
        console.error("Error in getChapters controller:", error);
        res.status(500).json({ status: "Error", message: error.message });
    }
};
