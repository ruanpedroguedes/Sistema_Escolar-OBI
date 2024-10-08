const Turma = require('../models/turmaModel');

// Create a new turma
exports.createTurma = async (req, res) => {
    try {
        const turma = new Turma(req.body);
        await turma.save();
        res.status(201).json(turma);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// View a turma
exports.getTurma = async (req, res) => {
    try {
        const turma = await Turma.findById(req.params.id).populate('alunos');
        if (!turma) return res.status(404).json({ message: 'Turma not found' });
        res.json(turma);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Edit a turma
exports.updateTurma = async (req, res) => {
    try {
        const turma = await Turma.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!turma) return res.status(404).json({ message: 'Turma not found' });
        res.json(turma);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a turma
exports.deleteTurma = async (req, res) => {
    try {
        const turma = await Turma.findByIdAndDelete(req.params.id);
        if (!turma) return res.status(404).json({ message: 'Turma not found' });
        res.json({ message: 'Turma deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lista todas as turmas
exports.getAllTurmas = async (req, res) => {
    try {
        const turmas = await Turma.find().populate('alunos');
        res.json(turmas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
