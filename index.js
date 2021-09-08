const { response } = require('express');
const express = require('express');
const dbcon = require('./db/config');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

const app = express();

const http = require('http');

setInterval(function () {
    http.get("http://aoimarket.herokuapp.com");
}, 600000);



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

const searchPage = require('./route/search/searchItem');
app.use('/searchItem', searchPage);

const kateSearchPage = require('./route/search/kateSearch');
app.use('/kateSearch', kateSearchPage);

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

const myPage = require('./route/member/mypage');
app.use('/mypage', myPage);

const port = process.env.PORT || 3400;
app.listen(port, () => {
    console.log('listening on : 3400');
})
