var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    req.session.loggedIn = undefined
    req.session.nomUtilisateur = undefined
    res.redirect("/")}
);

module.exports = router;


