const express = require('express');
const router = express.Router();
const conceitoController = require('../controllers/conceitoController');

router.post('/', conceitoController.saveConceito);

module.exports = router;
