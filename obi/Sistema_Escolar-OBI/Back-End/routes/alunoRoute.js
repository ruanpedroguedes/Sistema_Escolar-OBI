const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

// Create a new student
router.post('/', alunoController.createStudent);

// View a student
router.get('/:id', alunoController.getStudent);

// Edit a student
router.put('/:id', alunoController.updateStudent);

// Delete a student
router.delete('/:id', alunoController.deleteStudent);

module.exports = router;
