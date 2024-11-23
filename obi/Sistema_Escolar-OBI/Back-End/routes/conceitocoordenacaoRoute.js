const express = require('express');
const router = express.Router();
const conceitoCoordenacaoController = require('../controllers/conceitoCoordenacaoController');

router.get('/', conceitoCoordenacaoController.getConceitos);

module.exports = router;