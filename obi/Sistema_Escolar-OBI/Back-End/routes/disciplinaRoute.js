const express = require('express');
const router = express.Router();
const disciplinaController = require('../controllers/disciplinaController');

router.post('/', disciplinaController.createDisciplina);
router.get('/', disciplinaController.getAllDisciplinas);
router.put('/:id', disciplinaController.updateDisciplina); // Nova rota para atualizar
router.delete('/:id', disciplinaController.deleteDisciplina); // Nova rota para deletar

module.exports = router;
