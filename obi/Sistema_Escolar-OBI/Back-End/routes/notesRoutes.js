const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

// Rota para criar uma nova nota
router.post('/notas', notesController.createNote);

// Rota para listar todas as notas
router.get('/notas', notesController.getNotes);

// Rota para buscar uma nota por ID
router.get('/notas/:id', notesController.getNoteById);

// Rota para atualizar uma nota por ID
router.put('/notas/:id', notesController.updateNote);

// Rota para deletar uma nota
router.delete('/notas/:id', notesController.deleteNote);

// Rota para buscar notas por ID do aluno
router.get('/notas/aluno/:alunoId', notesController.getNotesByStudentId);

module.exports = router;
