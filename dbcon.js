var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit    : 10,
    host               : 'localhost',
    user               : 'put_your_own_user',
    password           : 'put_your_own_password',
    database           : 'put_your_own_database',
    multipleStatements : 'true'
});
module.exports.pool = pool;
