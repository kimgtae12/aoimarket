const { response } = require('express');
const express = require('express');
const dbcon = require('../../db/config');
const session = require('express-session');
const user_session = require('../user_session');

const router = express.Router();
const app = express();

//session 설정 세션을 이용하기 위해선 세션을 저장할 공간이 필요.
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: user_session
}));

router.route('/').get(function (req, res) {

    let itemInfoSelect = 'select * from itemlist where item_id = ?';
    let itemNumber = req.query.itemid;

    dbcon.query(itemInfoSelect, itemNumber, function (err, result, fields) {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(result);

        let price = [];
        for (let i = 0; i <= result.length - 1; i++) {
            price[i] = result[i].item_price.toLocaleString('ko-KR');
        }

        res.render('item/iteminfo', {
            login_id: req.session.uid,
            item_info: result,
            price: price
        });

    });



});


module.exports = router;