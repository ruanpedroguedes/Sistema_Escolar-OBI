const mongoose = require('mongoose')

const ClassSchema = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dateCreation: { type: Date, default: Date.now } 
})

module.exports = mongoose.model('Class', ClassSchema)