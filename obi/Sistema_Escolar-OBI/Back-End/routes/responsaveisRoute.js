const express = require('express');
const router = express.Router();
const Aluno = require('../models/alunoModel');

// Rota para atualizar as informações do aluno e dos responsáveis
router.put('/:id', async (req, res) => {
    try {
        const { username, dateOfBirth, turma, mae, pai } = req.body;
        const aluno = await Aluno.findById(req.params.id);
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }

        aluno.username = username;
        aluno.dateOfBirth = dateOfBirth;
        aluno.turma = turma;
        aluno.responsaveis.mae = mae;
        aluno.responsaveis.pai = pai;

        await aluno.save();
        res.status(200).json({ message: 'Aluno e responsáveis atualizados com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar aluno e responsáveis.', error: error.message });
    }
});

module.exports = router
