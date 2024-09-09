const mongoose = require('mongoose');

const ProfessoresDisciplinaSchema = new mongoose.Schema({
    professor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    disciplina_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discipline',
        required: true
    }
});

module.exports = mongoose.model('ProfessoresDisciplinas', ProfessoresDisciplinaSchema);