const express = require('express');
const router = express.Router();
const examController = require('../controllers/exam.controller');
// const { body } = require('express-validator');

// Validation middleware could be added here
// const validateExam = [ body('title').notEmpty(), ... ];

router.get('/', examController.getAllExams);
router.get('/:id', examController.getExamById);
router.post('/', examController.createExam);
router.put('/:id', examController.updateExam);
router.delete('/:id', examController.deleteExam);

module.exports = router;
