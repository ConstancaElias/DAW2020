//File controller

var File = require('../models/file')

//Devolve a lista de ficheiros
module.exports.list = () => {
    return File
        .find()
        .sort({nome: 1})
        .exec()
}
/*
module.exports.lookUp = id => {
    return Student
        .findOne({numero: id})
        .exec()
}*/

module.exports.insert = (files, desc) => {
    var newFiles = []
    var i;
    let file = {}
    for (i = 0; i < files.length; i++) {
        file = {
            date: new Date().toISOString().substr(0, 16),
            name: files[i].originalname,
            size: files[i].size,
            mimetype: files[i].mimetype,
            desc: desc[i]
        }
        newFiles.push(file)

    }
    return File.insertMany(newFiles) //para guardar o registo na bd
}
/*
module.exports.edit = student => {
    return Student
        .updateOne({numero: student.numero}, {nome: student.nome, numero: student.numero, git: student.git}) //para guardar o registo na bd
}

module.exports.editPhoto = (id, foto) => {
    return Student
        .updateOne({numero: id}, {foto: foto}) //para guardar o registo na bd
}

module.exports.delete = id => {
    return Student
        .deleteOne({numero: id}) //para guardar o registo na bd
}*/
