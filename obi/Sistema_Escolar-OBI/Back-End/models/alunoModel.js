const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
    foto: {
        type: String, // URL ou caminho da imagem
        required: true
    },
    turma: {
        type: String,
        required: true
    },
    numeroMatricula: {
        type: String,
        required: true,
        unique: true
    },
    idade: {
        type: Number,
        required: true,
        min: 0
    },
    responsavel1: {
        nome: String,
        telefone: String,
        email: String
    },
    responsavel2: {
        nome: String,
        telefone: String,
        email: String
    },
    emailAluno: {
        type: String,
        required: true,
        unique: true
    },
    observacoes: {
        type: String,
        default: ''
    }
});

const Aluno = mongoose.model('Aluno', alunoSchema);

module.exports = Aluno;
