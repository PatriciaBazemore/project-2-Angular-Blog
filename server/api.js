var express = require('express');

var posts = require('./controllers/posts.ctrl');  //one . means start here.. needed for modules you have created when require
var users = require('./controllers/users.ctrl');
var categories = require('./controllers/categories.ctrl');
var contactform = require('./controllers/contactform.ctrl');

var router = express.Router();

router.use('/contactform', contactform);
router.use('/posts', posts);  //if it starts with /posts use middleware posts..
router.use('/users', users);
router.use('/categories', categories);


module.exports = router;