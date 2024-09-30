const express = require('express');
const router = express.Router();
const studentClassController = require('../controllers/studentClassController');

// Rota para adicionar um aluno a uma turma
router.post('/add', studentClassController.addStudentToClass);

// Rota para remover um aluno de uma turma
router.delete('/remove', studentClassController.removeStudentFromClass);

// Rota para buscar todas as turmas de um aluno
router.get('/student/:studentId/classes', studentClassController.getClassesByStudent);

// Rota para buscar todos os alunos de uma turma
router.get('/class/:classId/students', studentClassController.getStudentsByClass);

module.exports = router;
