const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AlunoSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    useremail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true }, // Data de nascimento
    curso: { type: String, required: true },
    turma: { type: String, required: true },
    local: { type: String },
     // Adicionando campos dos responsáveis
     responsaveis: {
        mae: {
            nome: { type: String },
            telefone: { type: String },
            email: { type: String }
        },
        pai: {
            nome: { type: String },
            telefone: { type: String },
            email: { type: String }
        }
    }
});

// Hook para hash da senha antes de salvar
AlunoSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Método para comparar senhas
AlunoSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Aluno", AlunoSchema);
