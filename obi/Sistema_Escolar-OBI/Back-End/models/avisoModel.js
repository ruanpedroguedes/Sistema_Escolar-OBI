const mongoose = require('mongoose');

const AvisoSchema = new mongoose.Schema({
    author: { type: String, required: true },
    date: { type: Date, required: true },
    content: { type: String, required: true }
});

module.exports = mongoose.model("Aviso", AvisoSchema);
