const mongoose = require('mongoose');

const TurmaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    unidade: { type: String, required: true },
    curso: { type: String, required: true },
    alunos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Aluno' }]
});

module.exports = mongoose.model("Turma", TurmaSchema);
