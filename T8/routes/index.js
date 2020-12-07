var express = require('express')
var bodyParser = require('body-parser')
var router = express.Router();
var path = require('path')
//ler e escrever ficheiros json de uma vez. e converter logo em obj js
var jsonfile = require('jsonfile')
var fs = require('fs')

var multer = require('multer');
var File = require('../controllers/file');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + './../public/fileStore')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

//alias. Nao é a paste onde vou guardar os ficheiros, é a pasta onde o servidor guarda os ficheiros. tirar do sistema de quarentena e po-lo no sitio onde queremos que fique
var upload = multer({storage: storage})

var app = express()

//set logger (dev, como na apache)


//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

//parse application/json
app.use(bodyParser.json())

app.use(express.static('public'))

router.get('/', function(req, res, next) {
    var d = new Date().toISOString().substr(0, 16)
    File.list()
    .then(data => res.render('files', {files: data, d: d}))
    .catch(err => res.render('error', {error: err} ))
    
    
})

router.get('/files/upload', function(req, res){
    var d = new Date().toISOString().substr(0, 16)
    res.render('upFiles', {})
})

router.get('/files/download/:fname', (req, res) => {
    res.download(__dirname + './../public/fileStore/' + req.params.fname)
})

router.post('/files', upload.array('myFile'), function(req, res){
    var files = req.files

    console.log("Req FILES" + JSON.stringify(req.files))
    console.log(JSON.stringify(req.body))
  


      File.insert(files, req.body.desc)
      .then(data => {
      console.log("File " + data + " successfully added."); res.redirect('/')})
      .catch(err => res.render('error', {error: err} ))

      
})

module.exports = router;