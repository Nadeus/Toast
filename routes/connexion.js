var express = require('express');
var bcrypt = require('bcrypt')
let connection = require("../config/db")
var router = express.Router();


router.get('/', (req, res) => {
    if (req.session.erreur) {
        res.locals.erreur = req.session.erreur
        req.session.erreur = undefined
    }
    if (req.session.loggedIn) {
        res.redirect('/')
    }
    res.render('connexion', {title: 'Connexion'})
});

router.post('/', async (req, res) => {
    try {
        const queryDB = await connection.query("SELECT * FROM utilisateur WHERE nom_utilisateur= ?", [req.body.nomUtilisateur])
        if (String(queryDB) === "") {
            throw Error("Nom d'utilisateur ou mot de passe incorrect")
        }
        const checkMDP = await bcrypt.compare(req.body.password, Object.values(queryDB[0])[1]);
        if (checkMDP) {
            console.log("Utilisateur connecté !")
        } else {
            throw Error("Nom d'utilisateur ou mot de passe incorrect")
        }
        req.session.loggedIn = true
        req.session.nomUtilisateur = Object.values(queryDB[0])[0]
        res.redirect("/")
    } catch (err) {
        console.error(err)
        req.session.erreur = String(err)
        res.redirect("/connexion")
    }  
})

module.exports = router;
