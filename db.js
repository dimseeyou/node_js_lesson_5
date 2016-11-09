var mysql = require('mysql');

var db = mysql.createPool({
    host: 'localhost',
    database: 'gb_node',
    user: 'root',
    password: '',
});

module.exports = db;



