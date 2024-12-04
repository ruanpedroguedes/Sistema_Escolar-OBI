const mongoose = require('mongoose');

const ComunicadoSchema = new mongoose.Schema({
    turma: { type: mongoose.Schema.Types.ObjectId, ref: 'Turma', required: true },
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comunicado', ComunicadoSchema);