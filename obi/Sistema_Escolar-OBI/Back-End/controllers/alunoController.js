const AlunoModel = require('../models/alunoModel');

// Create a new aluno
exports.createAluno = async (req, res) => {
    try {
        const aluno = new AlunoModel(req.body);
        await aluno.save();
        res.status(201).json(aluno);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// View a aluno
exports.getAluno = async (req, res) => {
    try {
        const aluno = await AlunoModel.findById(req.params.id);
        if (!aluno) return res.status(404).json({ message: 'aluno not found' });
        res.json(aluno);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Edit a aluno
exports.updateAluno = async (req, res) => {
    try {
        const aluno = await AlunoModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!aluno) return res.status(404).json({ message: 'aluno not found' });
        res.json(aluno);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a aluno
exports.deleteAluno = async (req, res) => {
    try {
        const aluno = await AlunoModel.findByIdAndDelete(req.params.id);
        if (!aluno) return res.status(404).json({ message: 'aluno not found' });
        res.json({ message: 'aluno deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Lista todos os alunos
exports.getAllStudents = async (req, res) => {
    try {
        const alunos = await AlunoModel.find();
        res.json(alunos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};