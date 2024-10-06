const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ProfessorSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    useremail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true }, // Data de nascimento
    materia: { type: String, required: true },
    local: { type: String }
});

// Hook para hash da senha antes de salvar
ProfessorSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Método para comparar senhas
ProfessorSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Professor", ProfessorSchema);
