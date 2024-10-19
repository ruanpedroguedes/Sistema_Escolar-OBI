const mongoose = require('mongoose');

const ConceitoSchema = new mongoose.Schema({
    alunoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Aluno', required: true },
    materia: { type: String, required: true },
    av1: { type: String, enum: ['A', 'PA', 'NA'], required: true },
    av2: { type: String, enum: ['A', 'PA', 'NA'], required: true },
    av3: { type: String, enum: ['A', 'PA', 'NA'], required: true },
    conceitoFinal: { type: String, enum: ['A', 'PA', 'NA'], required: true }
});

module.exports = mongoose.model('Conceito', ConceitoSchema);
