const Aluno = require('../models/alunoModel');

exports.getBoletim = async (req, res) => {
    try {
        const alunos = await Aluno.find();
        res.json(alunos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
