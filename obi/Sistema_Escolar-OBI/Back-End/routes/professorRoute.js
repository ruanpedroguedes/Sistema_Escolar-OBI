const express = require('express');
const router = express.Router();
const Professor = require('../models/professorModel'); // Certifique-se de importar o model de Professor
const { registerUser } = require('../controllers/cadastramentoController');

router.post('/register', registerUser);

router.get('/', async (req, res) => {
    try {
        const professores = await Professor.find();
        res.json(professores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;