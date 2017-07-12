var express = require('express');
var procedures = require('../procedures/users.proc');
var auth = require('../middleware/auth.mw');
var passport = require('passport');


var router = express.Router();

//actually api/users..used them up going through other files

router.post('/login', function(req, res, next) {    //not protected, dont need to be logged in to log in
    passport.authenticate('local', function(err, user, info) {
        if (err) { 
            console.log(err); 
            return res.sendStatus(500); 
        }if (!user) { 
            return res.status(401).send(info); 
        }       
        req.logIn(user, function(err) {if (err) { 
            return res.sendStatus(500); 
        }else { return res.send(user); 
        }        
        });
    })(req, res, next);
});

router.all('*', auth.isLoggedIn);  //requires log in from this point down, all methods to all routes go through this, must be logged in to access below, 
                                    //you can do this individually like isAdmin

router.get('/logout', function(req, res) {
    req.session.destroy(function() {   //destorys sessions
        req.logOut();       //reset req.user...logged out for me 
        res.sendStatus(204);
    });
});

router.route('/')
    .get(function(req, res) {
        procedures.all()
        .then(function(users){
            res.send(users);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    });



module.exports = router;