//call stored procedures
//javascript functions whose sole purpose is to call stored procedures in database

var db = require('../config/db'); //go up to parent folder, into config, there is db

exports.all = function() {
    return db.rows('GetAllPosts');
}

exports.read = function(id) {
    return db.row('GetAPost', [id]);
}

exports.update = function(id, title, categoryid, content) {
    return db.empty('UpdatePost', [id, title, categoryid, content]);
}

exports.destroy = function(id) {
    return db.empty('DeletePost', [id]);
}

exports.create = function(title, categoryid, userid, content) {
    return db.row('CreatePost', [title, categoryid, userid, content]);
}
