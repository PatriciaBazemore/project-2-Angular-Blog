var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'AngularBlog'
});
exports.pool = pool;
//exports make it available to export to another file  

exports.rows = function(procedureName, args) {  //procedureName is promise
    return callProcedure(procedureName, args)  //need to return promise
        .then(function(resultsets) {  
            return resultsets[0];   //resolves- get full result set
        });
}

exports.row = function(procedureName, args) {
    return callProcedure(procedureName, args)
        .then(function(resultsets) {
            return resultsets[0][0];
        });
}

exports.empty = function(procedureName, args) {    //use for insert, delet--- we return nothing, aka resovle()
    return callProcedure(procedureName, args)
        .then(function() {
            return;
        });
}

function callProcedure(procedureName, args) {
    return new Promise(function(resolve, reject) {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            } else {
                var placeholders = '';
                if (args && args.length > 0) {
                    for(var i = 0; i < args.length; i++) {
                        if (i === args.length - 1) { //if we are on last arg of array
                            placeholders += '?';  
                        } else {
                            placeholders += '?,'; //if not the last arg, adds a ?...results in ?  for each placeholder
                        }
                    }
                }
                //connection.query('CALL' + procedureName + '(' + placholders + ');';
                var callString = 'CALL ' + procedureName + '(' + placeholders + ');';  //Call GetChirps(); or C
                connection.query(callString, args, function(err, resultsets) {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(resultsets);
                    }
                });
            }
        });
    });
}
