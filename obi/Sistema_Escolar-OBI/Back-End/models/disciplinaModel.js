const mongoose = require('mongoose');

const DisciplinaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    professor: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor', required: true },
    turma: { type: String, required: true }  // Mudamos para string devido à sua estrutura de opções de turma
});

module.exports = mongoose.model("Disciplina", DisciplinaSchema);
