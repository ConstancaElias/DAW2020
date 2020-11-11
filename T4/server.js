var http = require('http')
var fs = require('fs')
var aux = require('./mymod.js')

http.createServer (function (req, res){
    console.log(req.method + " " + req.url + " " + aux.myDateTime());
    var num = req.url.split("/")[2]
    if (req.method == "GET") {
        if (req.url.match('/arqs/([1-9][0-9])|(1[01][0-9])|(12[0-2])$/')){
            
            fs.readFile('site/arqs/arq' + num +'.html', function(err, data) {
                if (err) {
                    console.log("A leitura do ficheiro correu mal! " + num)
                    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8;'})
                    res.write("Não é possível abrir o ficheiro!")
                    res.end()
                }
                else {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8;'})
                    res.write(data)
                    res.end()
            }
        });            
        } else {
                    
                    fs.readFile('site/index.html', function(err, data) {
                        if (err) {
                            console.log('A leitura do ficheiro correu mal!' + num);
                            res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8;'})
                            res.write("Não é possível abrir o ficheiro!")
                            res.end()
                        }
                        else {
                            console.log(num);
                            res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8;'})
                            res.write(data)
                            res.end()
                        }
                    });
                }
    }
    else {
        console.log("Não é um método GET!.");   
    }
}).listen(7777)

//todas as funçoes de IO tem uma função callback que só é executada no fim, quando a ação acaba