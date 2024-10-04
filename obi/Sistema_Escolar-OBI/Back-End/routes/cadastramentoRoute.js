const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/cadastramentoController'); // Renomeei o controller

router.post('/register', registerUser);

module.exports = router;
