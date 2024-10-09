// models/agendaModel.js
const mongoose = require('mongoose');

// Definição do Schema para as tarefas
const agendaSchema = new mongoose.Schema({
  unidade: {
    type: String,
    required: true,
  },
  curso: {
    type: String,
    required: true,
  },
  turma: {
    type: String,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  dataHora: {
    type: Date,
    required: true,
  },
});

// Criação do modelo com base no Schema
const Agenda = mongoose.model('Agenda', agendaSchema);

module.exports = Agenda;
