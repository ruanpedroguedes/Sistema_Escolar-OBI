const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
   username: {type: String, required: true, unique: true},
   useremail: {type: String, required: true, unique: true},
   password: { type: String, required: true },
   usertype: { type: String, enum: ['Aluno', 'Professor', 'Coordenacao'], required: true }       
})

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
       this.password = await bcrypt.hash(this.password, 10)   
    }      

    next()
})

UserSchema.methods.comparePassword = function(password) {
   return bcrypt.compare(password, this.password)       
}

module.exports = mongoose.model("User", UserSchema)