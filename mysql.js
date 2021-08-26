var mysql = require('mysql'); //use mysql module

var connection = mysql.createConnection({ //mysql 객체의 createConnection 메소드 호출
    host: '34.64.89.241',
    user: 'aoiadmin',
    password: 'rlarudxo12',
    database: 'aoimarket',
    port: 3306
});

connection.connect(); //db연결

connection.query('select * from itemlist', function (error, results, fields) {
    if (error) {
        console.log(error);
    }
    console.log(results);
});

connection.end();