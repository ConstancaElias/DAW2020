var http = require('http')
var axios = require('axios')

http.createServer(function(req, res) {
    console.log(req.method + ' ' + req.url)
    if (req.method == "GET") {
        if (req.url == '/') {
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write('<h2>Escola de Música</h2>')
            res.write('<ul>')
            res.write('<li><a href="/alunos">Lista de Alunos</a></li>')
            res.write('<li><a href="/cursos">Lista de Cursos</a></li>')
            res.write('<li><a href="/instrumentos">Lista de Instrumentos</a></li>')
            res.write('</ul>')
            res.end()
        }
        else if (req.url == '/alunos'){
            axios.get('http://localhost:3000/alunos').then(function (resp) {
                alunos = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<h2>Escola de Música: Lista de Alunos</h2>')
                res.write('<ul>')
                
                alunos.forEach (a => {
                    res.write(`<li><a href="/alunos/${a.id}">` + a.id + ' - ' + a.nome + '</a></li>')
                });

                res.write('</ul>')
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()
            }).catch (function (error) {
                console.log("Erro na obtenção da lista de alunos: " + error);
            });
        
        } 
        else if (req.url.match(/\/alunos\/\w+$/)){
            var idAluno = req.url.split("/")[2]
            axios.get(`http://localhost:3000/alunos/${idAluno}`).then(function (resp) {
                aluno = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write(`<h2> ${aluno.nome}</h2>`)
                res.write(`<h4> Data Nascimento: ${aluno.dataNasc}</h4>`)
                res.write(`<h4> Curso: ${aluno.curso}</h4>`)
                res.write(`<h4> Ano Curso: ${aluno.anoCurso}</h4>`)
                res.write(`<h4> Instrumento: ${aluno.instrumento}</h4>`)

                res.write('<address>[<a href="/alunos">Voltar</a>]</address>')
                res.end()
            }).catch (function (error) {
                console.log("Erro na obtenção da lista de alunos: " + error);
            });
        
        } else if (req.url.match(/\/alunos\/\w+$/)){
            var idAluno = req.url.split("/")[2]
            axios.get(`http://localhost:3000/alunos/${idAluno}`).then(function (resp) {
                aluno = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write(`<h2> ${aluno.nome}</h2>`)
                res.write(`<h4> Data Nascimento: ${aluno.dataNasc}</h4>`)
                res.write(`<h4> Curso: ${aluno.curso}</h4>`)
                res.write(`<h4> Ano Curso: ${aluno.anoCurso}</h4>`)
                res.write(`<h4> Instrumento: ${aluno.instrumento}</h4>`)

                res.write('<address>[<a href="/alunos">Voltar</a>]</address>')
                res.end()
            }).catch (function (error) {
                console.log("Erro na obtenção da lista de alunos: " + error);
            });
        
        } else if (req.url == '/cursos'){
            axios.get('http://localhost:3000/cursos').then(function (resp) {
                cursos = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<h2>Escola de Música: Lista de Cursos</h2>')
                res.write('<ul>')
                
                cursos.forEach (c => {
                    res.write('<li><a href="/cursos/' + c.id + '">' + c.id + ' - ' + c.designacao + '</li>')
                });

                res.write('</ul>')
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()
            }).catch (function (error) {
                console.log("Erro na obtenção da lista de cursos: " + error);
            });
        } else if (req.url.match(/\/cursos\/\w+$/)){
            var idCurso = req.url.split("/")[2]
            axios.get(`http://localhost:3000/cursos/${idCurso}`).then(function (resp) {
                curso = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})

                res.write(`<h2>${curso.designacao} </h2>`)
                res.write(`<h4>Duração: ${curso.duracao} anos</h4>`)

                res.write('<address>[<a href="/cursos">Voltar</a>]</address>')
                res.end()
            }).catch (function (error) {
                console.log("Erro na obtenção do curso: " + error);
            });
        
        } else if (req.url == '/instrumentos'){
            axios.get('http://localhost:3000/instrumentos').then(function (resp) {
                instrumentos = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<h2>Escola de Música: Lista de Instrumentos</h2>')
                res.write('<ul>')
                
                instrumentos.forEach (i => {
                    res.write(`<li><a href="/instrumentos/${i.id}">` + i.id + ' - ' + i['#text'] + '</a></li>')
                });

                res.write('</ul>')
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()
            }).catch (function (error) {
                console.log("Erro na obtenção da lista de instrumentos: " + error);
            });
        } 
        else if (req.url.match(/\/instrumentos\/\w+$/)){
            var idInst = req.url.split("/")[2]
            axios.get(`http://localhost:3000/instrumentos/${idInst}`).then(function (resp) {
                instrumento = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<h2>Instrumento: '+ instrumento['#text'] + '</h2>')
                res.write('<h4>Id: '+ instrumento.id + '</h4>')

                res.write('<address>[<a href="/instrumentos">Voltar</a>]</address>')
                res.end()
            }).catch (function (error) {
                console.log("Erro na obtenção do instrumento" + instrumento + error);
            });
        
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
            res.end()
        }
    }
    else {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write("<p>Pedido não suportado geral: " + req.method + " " + req.url + "</p>")
        res.end()
    }
}).listen(4000)

console.log("Servidor à escuta na porta 4000...")