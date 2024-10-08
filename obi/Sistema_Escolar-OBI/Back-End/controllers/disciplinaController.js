const Disciplina = require('../models/disciplinaModel');

// Create a new disciplina
exports.createDisciplina = async (req, res) => {
    try {
        const { nome, professorId, turma } = req.body;
        const disciplina = new Disciplina({
            nome,
            professor: professorId,
            turma
        });
        await disciplina.save();
        res.status(201).json(disciplina);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// View all disciplinas
exports.getAllDisciplinas = async (req, res) => {
    try {
        const disciplinas = await Disciplina.find().populate('professor');
        res.json(disciplinas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
