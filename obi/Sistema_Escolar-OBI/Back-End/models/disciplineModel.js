const mongoose = require('mongoose');

const AvisoSchema = new mongoose.Schema({
    author: { type: String, required: true },
    date: { type: Date, required: true },
    content: { type: String, required: true }
});

const MaterialSchema = new mongoose.Schema({
    author: { type: String, required: true },
    date: { type: Date, required: true },
    link: { type: String, required: true }
});

const EnqueteSchema = new mongoose.Schema({
    author: { type: String, required: true },
    date: { type: Date, required: true },
    question: { type: String, required: true },
    options: [{
        option: { type: String, required: true },
        votes: { type: Number, default: 0 }
    }]
});

const DisciplineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    avisos: [AvisoSchema],      // Subdocumento de avisos
    materiais: [MaterialSchema], // Subdocumento de materiais
    enquetes: [EnqueteSchema]   // Subdocumento de enquetes
});

module.exports = mongoose.model('Discipline', DisciplineSchema);