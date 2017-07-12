var db = require('../config/db');

exports.readByEmail = function(email) {
    return db.row('GetUserByEmail', [email]);
}

exports.all = function() {
    return db.rows('GetUsers'); //stored procedure
}

exports.read = function(id) {
    return db.row('GetUser', [id]);
}

exports.create = function(email, password, firstName, lastName) {
    return db.row('CreateUser', [email, password, firstName, lastName]);
}