const mysql = require('mysql');

var dbcon = mysql.createConnection({
    host: '34.64.89.241',
    user: 'aoiadmin',
    password: 'rlarudxo12',
    database: 'aoimarket',
    port: 3306
});

module.exports = dbcon;