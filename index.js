const { response } = require('express');
const express = require('express');
const dbcon = require('./db/config');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const http = require('http');



setInterval(function () {
    http.get("http://aoimarket.herokuapp.com");
}, 600000);

const app = express();

/**
 * git add .
 * git commit "any"
 * git push heroku main
 */

app.use("/public", express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

const mainPage = require('./route/mainroute');
app.use('/', mainPage);

const loginPage = require('./route/member/login');
app.use('/login', loginPage);

const logoutPage = require('./route/member/logout');
app.use('/logout', logoutPage);

const joinPage = require('./route/member/join');
app.use('/join', joinPage);

const emailPage = require('./route/member/emailCheck');
app.use('/emailCheck', emailPage);


const itemInfo = require('./route/item/iteminfo');
app.use('/iteminfo', itemInfo);

const itemSubmmit = require('./route/item/itemSubmmit');
app.use('/itemSubmmit', itemSubmmit);

const port = process.env.PORT;

//const port = 3400;
app.listen(port, function () {
    console.log('server on! http://localhost:' + port);
});