const mongoose = require('mongoose');

const TurmaSchema = new mongoose.Schema({
    ano: { type: String, required: true },
    unidade: { type: String, required: true },
    curso: { type: String, required: true },
    turno: { type: String, required: true }
});

module.exports = mongoose.model("Turma", TurmaSchema);