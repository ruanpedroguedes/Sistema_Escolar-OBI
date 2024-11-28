const Turma = require('../models/turmaModel');

exports.createTurma = async (req, res) => {
    try {
        const turma = new Turma(req.body);
        await turma.save();
        res.status(201).json(turma);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllTurmas = async (req, res) => {
    try {
        const turmas = await Turma.find();
        res.json(turmas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};