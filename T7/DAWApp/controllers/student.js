//Student controller

var Student = require('../models/student')

// Devolve a lista de alunos
module.exports.list = () => {
    return Student
        .find()
        .sort({nome: 1})
        .exec()
}

module.exports.lookUp = id => {
    return Student
        .findOne({numero: id})
        .exec()
}

module.exports.insert = student => {
    var newStudent = new Student(student)
    return newStudent.save() //para guardar o registo na bd
}

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
}
