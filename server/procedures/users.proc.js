var db = require('../config/db');

exports.all = function() {
    return db.rows('GetUsers'); //stored procedure
}
