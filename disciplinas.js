const mongoose = require('mongoose');

const disciplinaSchema = new mongoose.Schema({
    // Nome da disciplina (ex: Matemática, Física)
    nome: {
        type: String,
        required: true, 
        trim: true      
    },
    
    // Código único da disciplina (ex: MAT101, FIS201)
    codigo: {
        type: String,
        required: true, 
        unique: true,   
        trim: true     
    },
    
    // Carga horária total da disciplina (ex: 60 horas)
    cargaHoraria: {
        type: Number,
        required: true  // Campo obrigatório
    },

    // Semestre em que a disciplina é oferecida (ex: 2023.1)
    semestre: {
        type: String,
        required: true, 
        trim: true      
    },

    // Data em que a disciplina foi criada no sistema
    dataCriacao: {
        type: Date,
        default: Date.now 
    }
});

const Disciplina = mongoose.model('Disciplina', disciplinaSchema);

module.exports = Disciplina;
