const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  aluno_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor', required: true }, 
  disciplina_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Discipline', required: true }, 
  conceito: { type: String, required: true } 
}, {
  timestamps: true 
});

module.exports = mongoose.model('note', noteSchema);
