const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turmaController');

router.post('/', turmaController.createTurma);
router.get('/:id', turmaController.getTurma);
router.put('/:id', turmaController.updateTurma);
router.delete('/:id', turmaController.deleteTurma);
router.get('/', turmaController.getAllTurmas);

module.exports = router;
