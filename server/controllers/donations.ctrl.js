var express = require('express');
var stripeSvc = require('../services/stripe.svc');

var router = express.Router();

router.post('/', function(req, res) {
    var amount = Number(req.body.amount);
    stripeSvc.charge(req.body.token, amount)
    .then(function(response) {
        console.log(response);
        res.sendStatus(201);  //get successful codes but not what it said 
    }).catch(function(err) {
        console.log(err);
        res.sendStatus(500);
    });
})

module.exports = router;

// var express = require('express');
// var stripeSvc = require('../services/stripe.svc');
// var router = express.Router();
// router.post('/', function(req, res) { // /api/donations
//     var amount = Number(req.body.amount);
//     stripeSvc.charge(req.body.token, amount)
//     .then(function(success) {
//         res.sendStatus(204);
//     }, function(err) { console.log(err); res.sendStatus(500); });
// });
// module.exports = router;
