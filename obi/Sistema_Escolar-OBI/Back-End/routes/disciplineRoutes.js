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

// Rota para adicionar um aviso à disciplina
router.post('/disciplinas/:disciplinaId/avisos', disciplineController.addAviso);

// Rota para adicionar um material à disciplina
router.post('/disciplinas/:disciplinaId/materiais', disciplineController.addMaterial);

// Rota para adicionar uma enquete à disciplina
router.post('/disciplinas/:disciplinaId/enquetes', disciplineController.addEnquete);

// Rota para deletar um aviso da disciplina
router.delete('/disciplinas/:disciplinaId/avisos/:avisoId', disciplineController.deleteAviso);

// Rota para deletar um material da disciplina
router.delete('/disciplinas/:disciplinaId/materiais/:materialId', disciplineController.deleteMaterial);

// Rota para deletar uma enquete da disciplina
router.delete('/disciplinas/:disciplinaId/enquetes/:enqueteId', disciplineController.deleteEnquete);

module.exports = router;