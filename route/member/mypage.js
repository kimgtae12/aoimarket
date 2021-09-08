const { response } = require('express');
const express = require('express');
const dbcon = require('../../db/config');
const session = require('express-session');
const user_session = require('../user_session');

const router = express.Router();

router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: user_session
}));

router.route('/').get(async function (req, res) {
    let myId = req.session.uid;

    let myItem = 'select * from itemlist where item_admin = ? and item_selling = ?';

    let selling = new Promise((resolve, reject) => {
        dbcon.query(myItem, [myId, '판매중'], function (err, results) {
            if (err) {
                reject(err);
            }
            resolve(results);

        });
    });
    let selling_list = await selling;

    let selling_price = [];
    for (let i = 0; i <= selling_list.length - 1; i++) {
        selling_price[i] = selling_list[i].item_price.toLocaleString('ko-KR');
    }

    let soldout = new Promise((resolve, reject) => {
        dbcon.query(myItem, [myId, '판매완료'], function (err, results) {
            if (err) {
                reject(err);
            }
            resolve(results);

        });
    });
    let soldout_list = await soldout;

    let soldout_price = [];
    for (let i = 0; i <= soldout_list.length - 1; i++) {
        soldout_price[i] = soldout_list[i].item_price.toLocaleString('ko-KR');
    }

    res.render('mypage', {
        login_id: myId,
        selling_price: selling_price,
        soldout_price: soldout_price,
        selling_data: selling_list,
        soldout_data: soldout_list
    });
});

module.exports = router;
