const Turma = require('../models/turmaModel');
const Professor = require('../models/professorModel'); // Certifique-se de importar o model de Professor

exports.createTurma = async (req, res) => {
    try {
        const { ano, unidade, curso, turno, professores } = req.body;

        // Busca os IDs dos professores pelos nomes
        const professorDocs = await Professor.find({ username: { $in: professores } });
        const professorIds = professorDocs.map(prof => prof._id);

        if (professorDocs.length !== professores.length) {
            return res.status(400).json({ error: 'Um ou mais professores não existem' });
        }

        const turma = new Turma({ ano, unidade, curso, turno, professores: professorIds });
        await turma.save();
        res.status(201).json(turma);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllTurmas = async (req, res) => {
    try {
        const turmas = await Turma.find().populate('professores'); // Popula os dados dos professores
        res.json(turmas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};