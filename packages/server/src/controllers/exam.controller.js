const Exam = require('../models/exam.model');
const { Subject } = require('../models/subject.model'); 
const { IClass } = require('../models/iclass.model');
const { Staff } = require('../models/staff.model');
const { validationResult } = require('express-validator');

// Get all exams with mapped names
exports.getAllExams = async (req, res) => {
  try {
    // For now, simple fetch. Associations can be added if models are correctly exported/associated
    const exams = await Exam.findAll({
        order: [['start_time', 'ASC']]
    });

    // Manually map if associations aren't set up globally (safest for quick impl)
    // In a real app, use include: [{model: Subject}, ...]
    
    res.status(200).json({ result: exams });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getExamById = async (req, res) => {
  try {
    const exam = await Exam.findByPk(req.params.id);
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    res.status(200).json(exam);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createExam = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const newExam = await Exam.create(req.body);
    res.status(201).json({ message: "Exam created successfully", result: newExam });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

exports.updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Exam.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ message: "Exam not found" });
    
    const updatedExam = await Exam.findByPk(id);
    res.status(200).json({ message: "Exam updated successfully", result: updatedExam });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Exam.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: "Exam not found" });
    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
