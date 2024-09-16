const express = require('express');
const router = express.Router();
const disciplineController = require('../controllers/disciplineController');

// Rota para criar uma nova disciplina e associar com um professor
router.post('/disciplinas', disciplineController.createDisciplina);

// Rota para listar todas as disciplinas, incluindo o professor associado
router.get('/disciplinas', disciplineController.getDisciplinas);

// Rota para buscar uma disciplina por ID, incluindo o professor associado
router.get('/disciplinas/:id', disciplineController.getDisciplinaById);

// Rota para atualizar uma disciplina por ID
router.put('/disciplinas/:id', disciplineController.updateDisciplina);

// Rota para deletar uma disciplina e suas associações
router.delete('/disciplinas/:id', disciplineController.deleteDisciplina);

module.exports = router;
