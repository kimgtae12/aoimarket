const { response } = require('express');
const express = require('express');
const dbcon = require('../../db/config');
const session = require('express-session');
const user_session = require('../user_session');
const bodyParser = require('body-parser');
const { search } = require('../mainroute');

const router = express.Router();
const app = express();

//session 설정 세션을 이용하기 위해선 세션을 저장할 공간이 필요.
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: user_session
}));

//body-parser 설정.
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());


router.route('/').get(async function (req, res) {

    let itemInfoSelect = 'select * from itemlist where item_id = ?';
    let itemView = 'update itemlist set item_view = item_view+1 where item_id = ?';
    let itemReplySelect = 'select * from itemReply where item_id = ?';
    let itemNumber = req.query.itemid;

    //조회수
    dbcon.query(itemView, itemNumber, function (err, re) {
        if (err) {
            console.log(err);
            throw err;
        }
    });

    let searchReply = new Promise((resolve, reject) => {
        dbcon.query(itemReplySelect, itemNumber, function (err, result) {
            if (err) {
                reject(err);
                throw err;
            }
            resolve(result);
        })
    });

    let reply = await searchReply;

    dbcon.query(itemInfoSelect, itemNumber, function (err, result, fields) {
        if (err) {
            console.log(err);
            throw err;
        }
        let price = [];
        for (let i = 0; i <= result.length - 1; i++) {
            price[i] = result[i].item_price.toLocaleString('ko-KR');
        }
        res.render('item/iteminfo', {
            login_id: req.session.uid,
            item_info: result,
            price: price,
            reply: reply
        });
    });

});

router.route('/reply').post(function (req, res) {
    res.setHeader('Content-type', 'text/html;charset=UTF-8');

    let item_id = req.body.item_id;
    let reply_id = req.session.uid;
    let reply_name = req.session.name;
    let reply_input = req.body.input_reply;
    let today = new Date();
    let reply_date = today.toLocaleString().toString();


    let selectReply = 'select max(reply_idx) as max_reply_idx from itemReply where item_id = ?';
    let insertReply = 'insert into itemReply values(?,?,?,?,?,?,?)';

    dbcon.query(selectReply, item_id, function (err, result) {
        let reply_idx;
        if (err) {
            console.log(err);
            throw err;
        }
        if (result[0].max_reply_idx == null) {
            reply_idx = 0;
            console.log(reply_idx);
        }
        else {
            reply_idx = result[0].max_reply_idx + 1;
            console.log(reply_idx);
        }
        let insertEl = [
            item_id,
            reply_idx,
            0,
            reply_id,
            reply_name,
            reply_input,
            reply_date
        ];

        dbcon.query(insertReply, insertEl, function (error, result) {
            if (error) {
                console.log(err);
                throw error;
            }
        })
    });

    res.redirect('/iteminfo?itemid=' + item_id);
});

router.route('/second_reply').post(function (req, res) {
    res.setHeader('Content-type', 'text/html;charset=UTF-8');

    let item_id = req.body.item_id;
    let reply_id = req.session.uid;
    let reply_name = req.session.name;
    let reply_input = req.body.input_reply;
    let today = new Date();
    let reply_date = today.toLocaleString().toString();


    let selectReply = 'select max(reply_idx) as max_reply_idx from itemReply where item_id = ?';
    let insertReply = 'insert into itemReply values(?,?,?,?,?,?,?)';

    dbcon.query(selectReply, item_id, function (err, result) {
        let reply_idx;
        if (err) {
            console.log(err);
            throw err;
        }
        if (result[0].max_reply_idx == null) {
            reply_idx = 0;
            console.log(reply_idx);
        }
        else {
            reply_idx = result[0].max_reply_idx + 1;
            console.log(reply_idx);
        }
        let insertEl = [
            item_id,
            reply_idx,
            0,
            reply_id,
            reply_name,
            reply_input,
            reply_date
        ];

        dbcon.query(insertReply, insertEl, function (error, result) {
            if (error) {
                console.log(err);
                throw error;
            }
        })
    });

    res.redirect('/iteminfo?itemid=' + item_id);
});




module.exports = router;