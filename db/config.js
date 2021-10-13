const mysql = require('mysql');

var dbcon = mysql.createConnection({
    host: 'host',
    user: 'aoiadmin',
    password: 'aoipassword',
    database: 'aoimarket',
    port: aoiport
});

module.exports = dbcon;
