var express = require('express');
var mailService = require('../services/email.svc');

var router = express.Router();

router.post('/', function(req, res) {
    // var contet ='<h3>You have a new message</h3>';
    // content += '<h5>From: ' + req.body.email + "</h5>";
    // contect += '<p>' + req.body.message + '</p>';
    // OR:
    let content = `<h3>You have a new message</h3>
                    <h5>From: ${req.body.email}</h5>
                    <p>${req.body.message}</p>`;
    mailService.sendEmail('trishbazemore@gmail.com', 'no-reply@trishbazemore.com', 'New Contact Form Submission', content)
    .then(function(success) {
        console.log(success);
        res.sendStatus(201);
    }).catch(function(err) {
        console.log(err);
        res.sendStatus(500);
    });
});

module.exports = router;