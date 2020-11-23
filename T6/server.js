var http = require('http')
var axios = require('axios')
var fs = require('fs')

var static = require('./static')
var template = require('./template')

var {parse} = require('querystring')
var idTarefa = 220
/*
// Template para o formulário de aluno ------------------
function geraFormAluno( d ){
    return `
    <html>
        <head>
            <title>Registo de um aluno</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="../w3.css"/>
        </head>
        <body>
        
        </body>
            <div class="w3-container w3-teal">
                <h2>Registo de Aluno</h2>
            </div>

            <form class="w3-container" action="/alunos" method="POST">
                <label class="w3-text-teal"><b>Nome</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="nome">
          
                <label class="w3-text-teal"><b>Número / Identificador</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="id">

                <label class="w3-text-teal"><b>Curso</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="curso">

                <label class="w3-text-teal"><b>Link para o repositório no Git</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="git">
          
                <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            </form>

            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::PRI2020 em ${d}</address>
            </footer>
        </body>
    </html>
    `
}
*/



// Retrieves student info from request body --------------------------------
function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            console.log(body)
            callback(parse(body))
        })
    }
}

// Criação do servidor

var toDoServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Tratamento do pedido
    if (static.recursoEstatico(req)){
        static.sirvoRecursoEstatico(req, res)
    }
    else {
    switch(req.method){
        case "GET": 
            // GET /tarefas --------------------------------------------------------------------
            if((req.url == "/") || (req.url == "/tarefas")){
                axios.get("http://localhost:3000/tarefas?_sort=tipo")
                    .then(response => {
                        var tarefas = response.data

                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(template.geraPagTarefas(tarefas, d))
                        res.end()
                        
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>GET: Não foi possível obter a lista de tarefas...")
                        res.end()
                    })
            } else if(/categorias\/\w+/.test(req.url)){
                let categoria = req.url.split("/")[2]
                axios.get("http://localhost:3000/tarefas?tipo=" + categoria)
                    .then(response => {
                        var tarefas = response.data

                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(template.geraPagTarefas(tarefas, d))
                        res.end()
                        
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>GET: Não foi possível obter a lista de tarefas da categoria " + categoria)
                        res.end()
                    })
            }
        break
        case "POST":
            if(req.url == '/tarefaNova'){
                recuperaInfo(req, resultado => {
                    console.log('POST de Tarefa:' + JSON.stringify(resultado))
                    axios.post('http://localhost:3000/tarefas', resultado)
                        .then(resp => {
                            console.log("Foi gerado!")
                        })
                        .catch(erro => {
                            console.log('Erro no POST: ' + erro + '</p>')
                        })
                        axios.get("http://localhost:3000/tarefas?_sort=tipo")
                        .then(response => {
                            var tarefas = response.data
    
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(template.geraPagTarefas(tarefas, d))
                            res.end()
                            
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de tarefas...")
                            res.end()
                        })
                     })

            } else if (/edit\/[0-9]+/.test(req.url)){
                var idTarefa = req.url.split("/")[1]
                recuperaInfo(req, resultado => {
                    console.log('PUT da Tarefa:' + JSON.stringify(resultado) + idTarefa)
                    axios.put('http://localhost:3000/tarefas/' + idTarefa, resultado)
                        .then(resp => {
                            console.log("Foi gerado!")
                        })
                        .catch(erro => {
                            console.log('Erro no PUT: ' + erro + '</p>')
                        })
                        axios.get("http://localhost:3000/tarefas?_sort=tipo")
                        .then(response => {
                            var tarefas = response.data
    
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(template.geraPagTarefas(tarefas, d))
                            res.end()
                            
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de tarefas...")
                            res.end()
                        })
                    })
            } else if (/taskDone\/\w+/.test(req.url)){
                var idTarefa = req.url.split("/")[2]
                recuperaInfo(req, resultado => {
                    console.log('PUT da Tarefa:' + JSON.stringify(resultado) + idTarefa)
                    axios.put('http://localhost:3000/tarefas/' + idTarefa, resultado)
                        .then(resp => {
                            console.log("Foi gerado!")
                        })
                        .catch(erro => {
                            console.log('Erro no PUT: ' + erro + '</p>')
                        })
                        axios.get("http://localhost:3000/tarefas?_sort=tipo")
                        .then(response => {
                            var tarefas = response.data

                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(template.geraPagTarefas(tarefas, d))
                            res.end()
                            
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de tarefas...")
                            res.end()
                        })
                })
            } else if (/delete\/[0-9]+/.test(req.url)){
                var idTarefa = req.url.split("/")[2]
              
                console.log('Delete da Tarefa:' + idTarefa)
                axios.delete('http://localhost:3000/tarefas/' + idTarefa, {})
                    .then(resp => {
                        console.log("Foi gerado!")
                    })
                    .catch(erro => {
                        console.log('Erro no DELETE: ' + erro + '</p>')
                    })
                    axios.get("http://localhost:3000/tarefas?_sort=tipo")
                    .then(response => {
                        var tarefas = response.data

                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(template.geraPagTarefas(tarefas, d))
                        res.end() 
                        
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Del: Não foi possível obter a lista de tarefas...")
                        res.end()
                    })
            }else{
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<p>Recebi um POST não suportado.</p>')
                res.write('<p><a href="/">Voltar</a></p>')
                res.end()
            }
            break
       
        default: 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " não suportado neste serviço.</p>")
            res.end()
    }
    }
})

toDoServer.listen(7778)
console.log('Servidor à escuta na porta 7778...')