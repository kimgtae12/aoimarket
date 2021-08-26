const MySQLStore = require('express-mysql-session');

var options = {
    host: '34.64.89.241',
    user: 'aoiadmin',
    password: 'rlarudxo12',
    database: 'aoimarket',
    port: 3306
};

//mysql store의 정보를 mysqlstore모듈에 넣어준다.
var sessionStore = new MySQLStore(options);

module.exports = sessionStore;

