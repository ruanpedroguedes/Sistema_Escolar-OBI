const Comunicado = require('../models/comunicadoModel');

exports.createComunicado = async (req, res) => {
    try {
        const { turma, titulo, descricao } = req.body;
        const comunicado = new Comunicado({ turma, titulo, descricao });
        await comunicado.save();
        res.status(201).json(comunicado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getComunicadosByTurma = async (req, res) => {
    try {
        const comunicados = await Comunicado.find({ turma: req.params.turmaId });
        res.json(comunicados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};