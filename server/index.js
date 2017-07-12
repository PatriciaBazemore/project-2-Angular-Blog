var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); //middleware parses the post requests
var prerender = require('prerender-node');
var api = require('./api');
var configurePassport = require('./config/passport');
var routing = require('./middleware/routing.mw');


var clientPath = path.join(__dirname, '../client');

prerender.set('prerenderToken', process.env.PRERENDER_TOKEN); //this needs to be protected before putting into github
//prerender.set('prerenderServiceUrl', 'http://localhost:1337/'); //this is to test, comment when it shows it works well
//ENVIRO variable 


var app = express();
app.use(prerender);

app.use(express.static(clientPath));
app.use(cookieParser());
app.use(bodyParser.json());  //use a body parser for parsing jsons needs to before anything using req.body etc
configurePassport(app);
app.use('/api', api);  //used in express to install a middleware or to install a subrouter, which is middleware

app.get('*', routing.stateRouting);
app.listen(process.env.PORT || 3000);  //enviro variable PORT set by AWS, is different everytime. If we aren't one it, use 3000. 
//if bad gateway error, look here
