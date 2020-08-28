var express = require('express');
var router = express.Router();
var Message = require('../models/message')

router.get('/:id', function(req, res) {
    Message.find(req.params.id, function(message) {
        res.render('message', {title: "Message", message: message})
    })
  });

module.exports = router;