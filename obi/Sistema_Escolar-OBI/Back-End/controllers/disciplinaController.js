const Disciplina = require('../models/disciplinaModel');
const Professor = require('../models/professorModel'); // Importa o modelo de Professor

// Crate a new disciplina
exports.createDisciplina = async (req, res) => {
    try {
        const { nome, professorNome, turma, unidade, curso } = req.body; // Inclui unidade e curso

        // Buscar o professor pelo nome
        const professor = await Professor.findOne({ username: professorNome });
        if (!professor) {
            return res.status(404).json({ error: "Professor não encontrado" });
        }

        const disciplina = new Disciplina({
            nome,
            professor: professor._id, // Usar o ID do professor encontrado
            turma,
            unidade, // Adiciona unidade
            curso   // Adiciona curso
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

// Delete a disciplina
exports.deleteDisciplina = async (req, res) => {
    try {
        const disciplina = await Disciplina.findByIdAndDelete(req.params.id);
        if (!disciplina) {
            return res.status(404).json({ error: "Disciplina não encontrada" });
        }
        res.json({ message: "Disciplina excluída com sucesso" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Update a disciplina
exports.updateDisciplina = async (req, res) => {
    try {
        const { nome, professorNome, turma, unidade, curso } = req.body; // Inclui unidade e curso
        const professor = await Professor.findOne({ username: professorNome });
        if (!professor) {
            return res.status(404).json({ error: "Professor não encontrado" });
        }

        const disciplina = await Disciplina.findByIdAndUpdate(req.params.id, {
            nome,
            professor: professor._id,
            turma,
            unidade, // Adiciona unidade
            curso   // Adiciona curso
        }, { new: true });

        if (!disciplina) {
            return res.status(404).json({ error: "Disciplina não encontrada" });
        }

        res.json(disciplina);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
