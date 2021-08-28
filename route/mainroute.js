const { response } = require('express');
const express = require('express');
const dbcon = require('../db/config');
const session = require('express-session');
const user_session = require('./user_session');

const router = express.Router();
const app = express();

//session 설정 세션을 이용하기 위해선 세션을 저장할 공간이 필요.
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: user_session
}));


router.route('/').get(async function (req, res) {
    let getimgList = new Promise((resolve, reject) => {
        dbcon.query('select * from mainBanner', function (er, path) {
            if (er) {
                reject(er);
            }
            resolve(path);
        });
    })
    let test = await getimgList;

    let getitemlist = new Promise((resolve, reject) => {
        dbcon.query('select * from itemlist order by item_view desc', function (error, results, fields) {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
    let results = await getitemlist;

    let price = [];
    for (let i = 0; i <= results.length - 1; i++) {
        price[i] = results[i].item_price.toLocaleString('ko-KR');
    }
    res.render('main', {
        imgpath: test,
        data: results,
        price: price,
        login_id: req.session.uid
    });
});

module.exports = router;