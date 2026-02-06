const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapter.controller');

router.get('/student/chapters/:class_id/:subject_id', chapterController.getChapters);

module.exports = router;
