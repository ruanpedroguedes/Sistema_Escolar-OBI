const express = require('express');
const router = express.Router();
const conceitoController = require('../controllers/conceitoController');

// Rotas para os conceitos
router.post('/', conceitoController.createConceito);
router.get('/', conceitoController.getAllConceitos);
router.get('/:id', conceitoController.getConceitoById);
router.put('/:id', conceitoController.updateConceitoById);
router.delete('/:id', conceitoController.deleteConceitoById);

module.exports = router;
