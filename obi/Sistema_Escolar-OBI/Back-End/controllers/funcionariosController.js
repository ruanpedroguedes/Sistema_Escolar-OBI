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

exports.getCoordenacao = async (req, res) => {
    try {
        const coordenacao = await Coordenacao.find();
        res.status(200).json(coordenacao);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter coordenação.', error: error.message });
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
