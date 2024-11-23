const Conceito = require('../models/conceitoModel');

exports.getConceitos = async (req, res) => {
    try {
        const conceitos = await Conceito.find().populate('alunoId', 'username turma');
        res.status(200).json(conceitos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};