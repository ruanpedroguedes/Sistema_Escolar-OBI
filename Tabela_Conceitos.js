const mongoose = require('mongoose');

const conceitoSchema = new mongoose.Schema({
    // Aluno relacionado (referência à tabela de Alunos)
    alunoId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Aluno', // Presume-se que exista uma entidade 'Aluno'
        required: true 
    },
    
    // Disciplina relacionada (referência à tabela de Disciplinas)
    disciplinaId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Disciplina', // Refere-se à sua tabela de disciplinas
        required: true
    },

    // Nota obtida pelo aluno na disciplina (ex: 85.5)
    nota: {
        type: Number,
        required: true,
        min: 0,  // Nota mínima
        max: 100 // Nota máxima
    },

    // Conceito final (ex: A, B, C, D, E)
    conceito: {
        type: String,
        required: true,
        enum: ['A', 'B', 'C', 'D', 'E', 'F'] // Apenas valores válidos para o conceito
    },

    // Comentários adicionais (ex: 'Excelente desempenho', 'Precisa melhorar')
    comentarios: {
        type: String,
        trim: true
    },

    // Data em que o conceito foi registrado
    dataRegistro: {
        type: Date,
        default: Date.now 
    }
});

// Criar o modelo para a Tabela de Conceitos
const Conceito = mongoose.model('Conceito', conceitoSchema);

module.exports = Conceito;
