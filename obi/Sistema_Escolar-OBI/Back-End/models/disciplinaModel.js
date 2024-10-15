const mongoose = require('mongoose');

const DisciplinaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    professor: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor', required: true },
    turma: { type: String, required: true },
    unidade: { type: String, required: true }, 
    curso: { type: String, required: true }    
});

module.exports = mongoose.model("Disciplina", DisciplinaSchema);
