const Aviso = require('../models/avisoModel');

exports.createAviso = async (req, res) => {
    try {
        const aviso = new Aviso(req.body);
        await aviso.save();
        res.status(201).json(aviso);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateAviso = async (req, res) => {
    try {
        const aviso = await Aviso.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!aviso) {
            return res.status(404).json({ error: "Aviso não encontrado" });
        }
        res.json(aviso);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteAviso = async (req, res) => {
    try {
        const aviso = await Aviso.findByIdAndDelete(req.params.id);
        if (!aviso) {
            return res.status(404).json({ error: "Aviso não encontrado" });
        }
        res.json({ message: "Aviso excluído com sucesso" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllAvisos = async (req, res) => {
    try {
        const avisos = await Aviso.find();
        res.json(avisos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
