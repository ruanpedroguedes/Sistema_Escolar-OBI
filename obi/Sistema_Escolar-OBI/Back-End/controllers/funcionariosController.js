const Professor = require('../models/professorModel');
const Coordenacao = require('../models/coordenacaoModel');

exports.getProfessores = async (req, res) => {
    try {
        const professores = await Professor.find();
        res.status(200).json(professores);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter professores.', error: error.message });
    }
};

exports.getProfessorById = async (req, res) => {
    try {
        const professor = await Professor.findById(req.params.id);
        if (!professor) {
            return res.status(404).json({ message: 'Professor não encontrado.' });
        }
        res.status(200).json(professor);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter professor.', error: error.message });
    }
};

exports.getCoordenacao = async (req, res) => {
    try {
        const coordenacao = await Coordenacao.find();
        res.status(200).json(coordenacao);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter coordenação.', error: error.message });
    }
};

exports.getCoordenadorById = async (req, res) => {
    try {
        const coordenador = await Coordenacao.findById(req.params.id);
        if (!coordenador) {
            return res.status(404).json({ message: 'Coordenador não encontrado.' });
        }
        res.status(200).json(coordenador);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter coordenador.', error: error.message });
    }
};

exports.deleteProfessor = async (req, res) => {
    try {
        await Professor.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Professor excluído com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir professor.', error: error.message });
    }
};

exports.deleteCoordenador = async (req, res) => {
    try {
        await Coordenacao.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Coordenador excluído com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir coordenador.', error: error.message });
    }
};
exports.updateProfessor = async (req, res) => {
    try {
        const professor = await Professor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!professor) {
            return res.status(404).json({ message: 'Professor não encontrado.' });
        }
        res.status(200).json(professor);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar professor.', error: error.message });
    }
};

exports.updateCoordenador = async (req, res) => {
    try {
        const coordenador = await Coordenacao.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!coordenador) {
            return res.status(404).json({ message: 'Coordenador não encontrado.' });
        }
        res.status(200).json(coordenador);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar coordenador.', error: error.message });
    }
};