const mongoose = require("mongoose")

const ClassDisciplineSchema = new mongoose.Schema({
   turma_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
   disciplina_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Discipline', required: true }
});
        
module.exports = mongoose.model('ClassDiscipline', ClassDisciplineSchema);