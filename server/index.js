var path = require('path');
var express = require('express');
var bodyParser = require('body-parser'); //middleware parses the post requests
var api = require('./api');
var routing = require('./middleware/routing.mw');

var clientPath = path.join(__dirname, '../client');

var app = express();
app.use(express.static(clientPath));
app.use(bodyParser.json());  //use a body parser for parsing jsons needs to before anything using req.body etc

app.use('/api', api);  //used in express to install a middleware or to install a subrouter, which is middleware

app.get('*', routing.stateRouting);
app.listen(3000);
