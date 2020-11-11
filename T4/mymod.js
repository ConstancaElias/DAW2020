exports.myDateTime = function () {
    var d = new Date()
    return d.toISOString().substring(0,10)
}


//dir é um obj inspector e vai fazer o display do primeiro nível
//há objs que tem vários niveis de estrutura como é o caso do request
//se usarmos o console.log para ver o request poderá dar um erro por um nivel ter um nome igual a outro nivel
exports.turma = "DAW 2020";

exports.myName = function () {
    return "José Carlos Ramalho"
}