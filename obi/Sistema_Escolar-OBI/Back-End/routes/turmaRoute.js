const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turmaController');

router.post('/', turmaController.createTurma);
router.get('/', turmaController.getAllTurmas);

module.exports = router;