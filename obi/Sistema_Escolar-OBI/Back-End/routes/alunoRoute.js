const express = require('express');
const router = express.Router();
const Aluno = require('../models/alunoModel');


router.get('/all', async (req, res) => {
    console.log('Recebido pedido para obter todos os alunos');
    try {
        const alunos = await Aluno.find();
        console.log('Alunos encontrados:', alunos);
        res.status(200).json(alunos);
    } catch (error) {
        console.error('Erro ao obter alunos:', error);
        res.status(500).json({ message: 'Erro ao obter alunos.', error: error.message });
    }
});

module.exports = router;

