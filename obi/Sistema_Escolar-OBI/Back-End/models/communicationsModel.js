const mongoose = require('mongoose')

const CommunicationSchema = new mongoose.Schema({
   title: { type: String, require: true },
   content: { type: String, require: true },
   author: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor', required: true },
   dateCreation: { type: Date, default: Date.now } 
})

module.exports = mongoose.model('Communication', CommunicationSchema)