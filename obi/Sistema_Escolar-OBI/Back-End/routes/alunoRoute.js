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

// Adicionar rota para obter um aluno específico
router.get('/:id', async (req, res) => {
    try {
        const aluno = await Aluno.findById(req.params.id);
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.status(200).json(aluno);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter aluno.', error: error.message });
    }
});

// Adicionar rota para atualizar um aluno específico
router.put('/:id', async (req, res) => {
    try {
        const { username, dateOfBirth, turma, unidade, mae, pai } = req.body; // Adicionei "unidade"
        const aluno = await Aluno.findById(req.params.id);
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }

        aluno.username = username;
        aluno.dateOfBirth = dateOfBirth;
        aluno.turma = turma;
        aluno.unidade = unidade; // Adicionei "unidade"
        aluno.responsaveis.mae = mae;
        aluno.responsaveis.pai = pai;

        await aluno.save();
        res.status(200).json({ message: 'Aluno e responsáveis atualizados com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar aluno e responsáveis.', error: error.message });
    }
});

// Adicionar rota para excluir um aluno específico
router.delete('/:id', async (req, res) => {
    try {
        const aluno = await Aluno.findByIdAndDelete(req.params.id);
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.status(200).json({ message: 'Aluno excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir aluno.', error: error.message });
    }
});



module.exports = router;