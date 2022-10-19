var express = require('express');
var router = express.Router();

var DBConn = require('../db-conn');
var db = new DBConn();

/* GET home page. */
router.get('/', function(req, res, payload, next) {

  db.findAllEventos( (err, data) => {
    //res.send(data);
    res.render('eventos/index', { eventos: data });
  });

  //res.render('eventos/index');
});

/* GET home page. */
router.get('/novo', function(req, res, next) {
  res.render('eventos/novo');
});

router.post('/', function(req, res, next) {

  var errors = [];

  if (req.body.name == "") {
    errors.push("Nome não informado");
  } else if (req.body.name.length < 3) {
    errors.push("Nome deve conter pelo menos 3 caracteres.");
  }

  if (errors.length == 0) {
    db.createEvento(req.body.name, req.body.username, req.body.email, req.body.password, (err, data) => {
      if (err) {
        next(err);
      } else {
        res.redirect('/eventos');
      }
    });  
  } else {
    res.render('eventos/novo', { "errors": errors });
  }  
});

/* GET home page. */
router.get('/:id', function(req, res, next) {
  //res.send(req.params);
  db.getEventoById(req.params.id, (err, data) => {
    if (err) {
      next(err);
    }
    else if (data) {
      //res.send(data);
      res.render('eventos/detalhe', { evento: data });
    } else {
      res.status(404).send("Evento não encontrado.");
    }
  });
});

/* Rota para exclusão de um evento */
router.post('/deletar/:id', function(req, res, next) {
  db.deleteEvento(req.params.id, (err, data) => {
    if (err) {
      next(err);
    } else {
      //res.send('Novo evento criado:' + req.body.nome);
      res.redirect('/eventos');
    }
  });  
});

module.exports = router;
