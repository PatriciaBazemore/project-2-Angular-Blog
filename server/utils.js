var bcrypt = require('bcrypt'); //change second part to bcrypt when i get xcode
const SALT_ROUNDS = 12;

exports.encryptPassword = function(pw) {
    return bcrypt.hash(pw, SALT_ROUNDS);  //have to return to do .then elsewhere where callled 
}
exports.checkPassword = function(pw, hash) {
    return bcrypt.compare(pw, hash);
}