var mongoose = require('mongoose') //criar um apontador para a instancia criada no app.js

var studentSchema = new mongoose.Schema({
    numero: String,
    nome: String,
    git: String,
    tpc: [Number],
    foto: String
});

module.exports = mongoose.model('student', studentSchema)