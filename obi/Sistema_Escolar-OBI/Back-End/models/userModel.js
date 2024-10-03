const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    useremail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    usertype: { type: String, enum: ['Aluno', 'Professor', 'Coordenação'], required: true }
});

// Hook para hash da senha antes de salvar
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Método para comparar senhas
UserSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
