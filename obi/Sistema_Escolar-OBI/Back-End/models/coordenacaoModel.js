const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const CoordenacaoSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    useremail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true }, // Data de nascimento
    funcao: { type: String, required: true },
    local: { type: String }
});

// Hook para hash da senha antes de salvar
CoordenacaoSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Método para comparar senhas
CoordenacaoSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Coordenacao", CoordenacaoSchema);
