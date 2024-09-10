const mongoose = require("mongoose")

const StudentClassSchema = new mongoose.Schema({
   student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true }
});

module.exports = mongoose.model('StudentClass', StudentClassSchema);