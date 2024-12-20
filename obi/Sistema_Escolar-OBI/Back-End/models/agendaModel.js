const mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema({
  unidade: { type: String, required: true },
  curso: { type: String, required: true },
  turma: { type: String, required: true },
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  dataHora: { type: Date, required: true }
});

module.exports = mongoose.model('Agenda', agendaSchema);