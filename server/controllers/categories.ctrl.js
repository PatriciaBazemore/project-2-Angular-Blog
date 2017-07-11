var express = require('express');
var procedures = require('../procedures/categories.proc');


var router = express.Router();

//actually api/users..used them up going through other files

router.route('/')
    .get(function(req, res) {
        procedures.all()
        .then(function(categories){
            res.send(categories);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    });
    


module.exports = router;