var express = require('express');
var procedures = require('../procedures/posts.proc'); //will have all, read, export, and destory

var router = express.Router();


router.route('/')  //collection end point  ...we created a router in charge of our chirps we dropped the chirps part of /api/chirps/ b/c they are in previous steps
    .get(function(req, res) {
        procedures.all()
        .then(function(posts) {
            res.send(posts);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        })
    })
    .post(function(req, res) {
        procedures.create(req.body.title, req.body.categoryid, req.body.userid, req.body.content) //mirrors index.js or stored procedures
        .then(function(id) {
            res.status(201).send(id);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    });

router.route('/:id')  //single endpoints
    .get(function(req, res) {
        procedures.read(req.params.id)
            .then(function(post) {
                res.send(post);
            }).catch(function(err) {
                console.log(err);
                res.sendStatus(500);
            });
    })
    .put(function(req, res) {
        procedures.update(req.params.id, req.body.title, req.body.categoryid, req.body.content, )//comes from json message has to match front end
        .then(function() {
            res.sendStatus(204);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .delete(function(req, res) {
        procedures.destroy(req.params.id)
        .then(function() {
            res.sendStatus(204);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    });

module.exports = router; 