const express = require('express');
const router = express.Router();
const classDisciplineController = require('../controllers/classDisciplineController');

// Rota para criar uma nova associação entre classe e disciplina
router.post('/classDiscipline', classDisciplineController.createClassDiscipline);

// Rota para listar todas as associações de classe e disciplina
router.get('/classDiscipline', classDisciplineController.getClassDisciplines);

// Rota para buscar uma associação de classe e disciplina por ID
router.get('/classDiscipline/:id', classDisciplineController.getClassDisciplineById);

// Rota para atualizar uma associação de classe e disciplina por ID
router.put('/classDiscipline/:id', classDisciplineController.updateClassDiscipline);

// Rota para deletar uma associação de classe e disciplina
router.delete('/classDiscipline/:id', classDisciplineController.deleteClassDiscipline);

module.exports = router;
