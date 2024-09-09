const Conceito = require('../models/conceito'); // Ajuste o caminho conforme a sua estrutura de pastas

// Criar um novo conceito
exports.createConceito = async (req, res) => {
    try {
        const { alunoId, disciplinaId, nota, conceito, comentarios } = req.body;

        const novoConceito = new Conceito({
            alunoId,
            disciplinaId,
            nota,
            conceito,
            comentarios
        });

        const resultado = await novoConceito.save();
        res.status(201).json({
            success: true,
            data: resultado
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Obter todos os conceitos
exports.getAllConceitos = async (req, res) => {
    try {
        const conceitos = await Conceito.find()
            .populate('alunoId', 'nome') // Ajuste o campo que deseja popular
            .populate('disciplinaId', 'nome'); // Ajuste o campo que deseja popular

        res.status(200).json({
            success: true,
            data: conceitos
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Obter um conceito por ID
exports.getConceitoById = async (req, res) => {
    try {
        const conceito = await Conceito.findById(req.params.id)
            .populate('alunoId', 'nome') // Ajuste o campo que deseja popular
            .populate('disciplinaId', 'nome'); // Ajuste o campo que deseja popular

        if (!conceito) {
            return res.status(404).json({
                success: false,
                message: 'Conceito não encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: conceito
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Atualizar um conceito por ID
exports.updateConceitoById = async (req, res) => {
    try {
        const { alunoId, disciplinaId, nota, conceito, comentarios } = req.body;

        const conceitoAtualizado = await Conceito.findByIdAndUpdate(
            req.params.id,
            { alunoId, disciplinaId, nota, conceito, comentarios },
            { new: true, runValidators: true }
        );

        if (!conceitoAtualizado) {
            return res.status(404).json({
                success: false,
                message: 'Conceito não encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: conceitoAtualizado
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Excluir um conceito por ID
exports.deleteConceitoById = async (req, res) => {
    try {
        const conceitoDeletado = await Conceito.findByIdAndDelete(req.params.id);

        if (!conceitoDeletado) {
            return res.status(404).json({
                success: false,
                message: 'Conceito não encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Conceito excluído com sucesso'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
