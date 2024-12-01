const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turmaController'); // Certifique-se de que o caminho está correto

router.post('/', turmaController.createTurma);
router.get('/', turmaController.getAllTurmas);
router.get('/:id', turmaController.getTurmaById); // Nova rota para obter uma turma pelo ID
router.put('/:id', turmaController.updateTurma); // Nova rota para atualizar uma turma
router.delete('/:id', turmaController.deleteTurma); // Nova rota para excluir uma turma

module.exports = router;