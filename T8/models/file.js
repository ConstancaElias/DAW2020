var mongoose = require('mongoose') //criar um apontador para a instancia criada no app.js

var FileSchema = new mongoose.Schema({
    date: String,
    name: String,
    size: Number,
    mimetype: String,
    desc: String
});

module.exports = mongoose.model('file', FileSchema)