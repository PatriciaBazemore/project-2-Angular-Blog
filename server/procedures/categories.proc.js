var db = require('../config/db'); //go up to parent folder, into config, there is db

exports.all = function() {
    return db.rows('GetCategories'); //stored procedure
}


//don't need right now
// exports.read = function(id) {
//     return db.row('GetCategory', [id]);
// }

// exports.update = function(title, content, categoryid) {
//     return db.empty('UpdateCategory', [title, content, categoryid]);
// }

//don't think we'll need these 
// exports.destroy = function(id) {
//     return db.empty('DeleteCategory', [id]);
// }

// exports.create = function(title, categoryid, userid, content) {
//     return db.row('CreateCategory', [title, categoryid, userid, content]);
// }