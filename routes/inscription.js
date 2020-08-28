var express = require('express');
var bcrypt = require('bcrypt')
let connection = require("../config/db")
var router = express.Router();


router.get('/', function(req, res, next) {
    if (req.session.erreur) {
        res.locals.erreur = req.session.erreur
        req.session.erreur = undefined
    }
    if (req.session.reussite) {
        res.locals.reussite = req.session.reussite
        req.session.reussite = undefined
    }
    res.render('inscription', {title: 'Inscription'})}
);

router.post('/', async (req, res) => {
    try {
        const utilisateurAvecCeNom = await connection.query("SELECT COUNT(*) FROM utilisateur WHERE nom_utilisateur= ?", [req.body.nomUtilisateur])
        if (Object.values(utilisateurAvecCeNom[0])[0] > 0) {
            throw Error("Un utilisateur a déjà ce nom.")
        }
        if (req.body.password != req.body.confirmerPassword) {
            throw Error("Les mots de passe fournis sont différents")
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await connection.query('INSERT INTO utilisateur SET nom_utilisateur = ?, mdp = ?, date_creation = ?', [req.body.nomUtilisateur, hashedPassword, new Date()])
        console.log("Utilisateur ajouté avec succès.")
        req.session.reussite = "Vous vous êtes bien inscrit !"
        res.redirect("/inscription")        
    } catch(err) {
        req.session.erreur = String(err)
        res.redirect("/inscription")
    }
})


module.exports = router;

