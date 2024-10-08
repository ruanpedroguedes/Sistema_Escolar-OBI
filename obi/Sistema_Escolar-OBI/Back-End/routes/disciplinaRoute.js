const express = require('express');
const router = express.Router();
const disciplinaController = require('../controllers/disciplinaController');

router.post('/', disciplinaController.createDisciplina);
router.get('/', disciplinaController.getAllDisciplinas);

module.exports = router;
