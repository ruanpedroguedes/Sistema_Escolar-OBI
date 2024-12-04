const express = require('express');
const router = express.Router();
const comunicadoController = require('../controllers/comunicadoController');

router.post('/', comunicadoController.createComunicado);
router.get('/:turmaId', comunicadoController.getComunicadosByTurma);

module.exports = router;