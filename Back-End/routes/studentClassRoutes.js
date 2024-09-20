const express = require('express');
const router = express.Router();
const studentClassController = require('../controllers/studentClassController');

// Rota para criar uma nova associação entre aluno e classe
router.post('/studentClass', studentClassController.createStudentClass);

// Rota para listar todas as associações de alunos e classes
router.get('/studentClass', studentClassController.getStudentClasses);

// Rota para buscar uma associação de aluno e classe por ID
router.get('/studentClass/:id', studentClassController.getStudentClassById);

// Rota para atualizar uma associação de aluno e classe por ID
router.put('/studentClass/:id', studentClassController.updateStudentClass);

// Rota para deletar uma associação de aluno e classe por ID
router.delete('/studentClass/:id', studentClassController.deleteStudentClass);

// Rota para listar todas as classes associadas a um aluno específico
router.get('/studentClass/aluno/:alunoId', studentClassController.getClassesByStudentId);

// Rota para listar todos os alunos associados a uma classe específica
router.get('/studentClass/classe/:classId', studentClassController.getStudentsByClassId);

module.exports = router;