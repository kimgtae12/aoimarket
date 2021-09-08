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
    let itemReplySelect = 'select * from itemReply where item_id = ? and par_comment = 0';
    let itemSecReplySel = 'select * from itemReply where item_id = ? and par_comment > 0'
    let itemNumber = req.query.itemid;

    //조회수
    dbcon.query(itemView, itemNumber, function (err, re) {
        if (err) {
            console.log(err);
            throw err;
        }
    });


    //1nd reply search
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

    //2nd reply search
    let searchReply2 = new Promise((resolve, reject) => {
        dbcon.query(itemSecReplySel, itemNumber, function (err, result) {
            if (err) {
                reject(err);
                throw err;
            }
            resolve(result);
        })
    });

    let secondReply = await searchReply2;

    dbcon.query(itemInfoSelect, itemNumber, function (err, result, fields) {
        if (err) {
            console.log(err);
            throw err;
        }
        let price = [];
        for (let i = 0; i <= result.length - 1; i++) {
            price[i] = result[i].item_price.toLocaleString('ko-KR');
        }

        let imgList = [result[0].item_firstimg, result[0].item_secondimg, result[0].item_third];

        res.render('item/iteminfo', {
            login_id: req.session.uid,
            item_info: result,
            price: price,
            reply: reply,
            imgList: imgList,
            secondReply: secondReply
        });
    });

});


router.route('/updateinfo').get(async function (req, res) {

    let itemId = req.query.itemid;

    let viewItemInfo = 'select * from itemlist where item_id = ?';

    dbcon.query(viewItemInfo, itemId, function (error, result) {
        if (error) {
            console.log(error);
            throw error;
        }
        let img_list = [result[0].item_firstimg, result[0].item_secondimg, result[0].item_third]
        res.render('item/updateinfo', {
            login_id: req.session.uid,
            result: result,
            imglist: img_list
        });
    });
});

router.route('/itemUpdate').post(function (req, res) {

    let itemId = req.query.itemid;
    let itemSelling = req.body.item_selling;
    let itemTitle = req.body.item_title;
    let kate = req.body.item_kate;

    let split_kate = kate.split(' - ');
    let itemKate1 = split_kate[0];
    let itemKate2 = split_kate[1];

    let itemPrice = req.body.item_price;
    let itemInfo = req.body.item_info;
    let itemTrade = req.body.item_trade;
    let itemStat = req.body.item_stat;
    let today = new Date();
    let itemDate = today.toLocaleString().toString();

    let updateVar = [
        itemTitle,
        itemPrice,
        itemDate,
        itemTrade,
        itemStat,
        itemInfo,
        itemKate1,
        itemKate2,
        itemSelling,
        itemId
    ];


    let updateItemInfo = 'update itemlist set item_title = ?, item_price = ?, item_date = ?,item_trade=?, item_stat = ?, item_comment = ?, item_kate1 = ?, item_kate2 = ?, item_selling = ? where item_id = ?';

    dbcon.query(updateItemInfo, updateVar, function (error) {
        if (error) {
            console.log(error);
            throw error;
        }
        res.redirect('/iteminfo?itemid=' + itemId);
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
    let reply_idx = req.body.reply_idx;
    let today = new Date();
    let reply_date = today.toLocaleString().toString();


    let selectReply = 'select max(par_comment) as maxParcom from itemReply where item_id = ? and reply_idx = ?';
    let insertReply = 'insert into itemReply values(?,?,?,?,?,?,?)';

    dbcon.query(selectReply, [item_id, reply_idx], function (err, result) {
        let inputParentComm = result[0].maxParcom + 1;
        if (err) {
            console.log(err);
            throw err;
        }
        else {
            let insertEl = [
                item_id,
                reply_idx,
                inputParentComm,
                reply_id,
                reply_name,
                reply_input,
                reply_date
            ];

            dbcon.query(insertReply, insertEl, function (error, results) {
                if (error) {
                    console.log(error);
                    throw error;
                }

            });
        }
    });
    res.redirect('/iteminfo?itemid=' + item_id);
});


router.route('/delete').get(function (req, res) {
    let replyidx = req.query.replyIdx;
    let itemidx = req.query.item_id;

    let deleteReply = "delete from itemReply where item_id=? and reply_idx = ?";

    dbcon.query(deleteReply, [itemidx, replyidx], function (err, result) {
        if (err) {
            console.log(err);
            throw err;
        }
    });
    res.redirect('/iteminfo?itemid=' + itemidx);
});

router.route('/secondDelete').get(function (req, res) {
    let replyidx = req.query.reply_idx;
    let itemidx = req.query.item_id;
    let secondReidx = req.query.secondRe_idx;

    let deleteReply = "delete from itemReply where item_id=? and reply_idx = ? and par_comment = ?";

    dbcon.query(deleteReply, [itemidx, replyidx, secondReidx], function (err, result) {
        if (err) {
            console.log(err);
            throw err;
        }
    });
    res.redirect('/iteminfo?itemid=' + itemidx);
});

router.route('/deleteinfo').get(function (req, res) {

    let deleteidx = req.query.itemid;

    let deleteItem = "delete from itemlist where item_id = ?";
    let deleteReply = "delete from itemReply where item_id = ?";

    dbcon.query(deleteItem, deleteidx, function (err) {
        if (err) {
            console.log(err);
            throw err;
        }
    });
    dbcon.query(deleteReply, deleteidx, function (err) {
        if (err) {
            console.log(err);
            throw err;
        }
    });

    res.redirect('/mypage');
});



module.exports = router;