const mongoose = require('mongoose')

const DisciplineSchema = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true }      
})

module.exports = mongoose.model('Discipline', DisciplineSchema)