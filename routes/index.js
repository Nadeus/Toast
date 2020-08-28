var express = require('express');
var router = express.Router();
var Message = require('../models/message')

/* GET home page. */
router.get('/', function(req, res, next) {
  Message.all(function (messages) {
    if (req.session.loggedIn) {
      res.locals.loggedIn = true;
      res.locals.nomUtilisateur = req.session.nomUtilisateur
    } 
    res.render('index', {title: 'Accueil', messages: messages} )
  })
});

router.post('/', (req, res) => {
  if (req.session.loggedIn === undefined) {
    req.flash('error', "Vous devez être connecté pour poster un message !")
    res.redirect("/")
  } else if (req.body.Message === undefined || req.body.Message === '') {
    req.flash('error', "Vous n'avez pas posté de message")
    res.redirect("/")
  } else {
    Message.create(req.body.Message, function() {
      req.flash('success', "Merci " + req.session.nomUtilisateur + " !")
      res.redirect("/")
    }, req.session.nomUtilisateur)
  }
})
module.exports = router;
