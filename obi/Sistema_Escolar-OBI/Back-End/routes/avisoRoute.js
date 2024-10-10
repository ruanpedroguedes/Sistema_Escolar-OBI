const express = require('express');
const router = express.Router();
const avisosController = require('../controllers/avisoController');

router.post('/', avisosController.createAviso);
router.put('/:id', avisosController.updateAviso);
router.delete('/:id', avisosController.deleteAviso);
router.get('/', avisosController.getAllAvisos);

module.exports = router;
