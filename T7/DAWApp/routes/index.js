var express = require('express');
var multer = require('multer');
var router = express.Router();
const path = require('path');

var Student = require('../controllers/student')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage, dest: './public/images/uploads/' })

/* GET students */
router.get(['/students', '/', '/students/insert', 'students/:id'], function(req, res, next) {
  Student.list() //é uma promessa, posso usar o then
    .then(data => res.render('students', {list: data}))
    .catch(err => res.render('error', {error: err} ))
});

/* GET student page */
router.get('/students/:id', function(req, res) {
  var id = req.params.id;
  console.log("GET page student: " + id)
  Student.lookUp(id) //é uma promessa, posso usar o then
    .then(data => {res.render('studentPage', {student: data});
  console.log("Student: " + data)})
    .catch(err => res.render('error', {error: err} ))
});

/* GET student page  */
router.get('/students/edit/:id', function(req, res) {
  var id = req.params.id;
  console.log("GET edir form student: " + id)
  Student.lookUp(id) //é uma promessa, posso usar o then
    .then(data => {res.render('editStudent', {student: data});
  console.log("Student: " + data)})
    .catch(err => res.render('error', {error: err} ))
});


/* PUT edit student */
router.put('/students', function(req, res) {
  let student = {
    numero: req.body.numero,
    nome: req.body.nome,
    git: req.body.git
  }

  Student.edit(student) //é uma promessa, posso usar o then
    .then(data => {
          console.log("Student " + student.nome + " successfully added.");})
          res.redirect('/students')
    .catch(err => res.render('error', {error: err} ))
});


/* POST new student */
router.post('/students', function(req, res) {
  let student = {
    numero: req.body.numero,
    nome: req.body.nome,
    git: req.body.git
  }
  Student.insert(student)
    .then(data => {res.redirect('/students');
  console.log("Student " + student.nome + " successfully added.")})
    .catch(err => res.render('error', {error: err} ))
  
});

/* PUT add student photo */
router.put('/students/:id', upload.single('foto'), function(req, res) {
  var img = req.file.filename;

  console.log(img);
  Student.editPhoto(id, img)
    .then(data => {console.log('saved to database');
    res.redirect('/students')})
    .catch(err => console.log(err))
  
     
    
    

  
});


/* DELETE delete student */
router.delete('/students/:id', function(req, res) {
  var id = req.params.id;
  Student.delete(id) 
    .then(data => {
          console.log("Student " + student.nome + " successfully removed.");})
          res.redirect('/students')
    .catch(err => res.render('error', {error: err} ))
});

module.exports = router;
