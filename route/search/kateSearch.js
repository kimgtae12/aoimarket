const { response } = require('express');
const express = require('express');
const dbcon = require('../../db/config');
const session = require('express-session');
const user_session = require('../user_session');
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


router.route('/').get(async function (req, res) {
    let kate1 = req.query.kate1;
    let kate2 = req.query.kate2;

    let itemSelQuery = 'select * from itemlist where item_kate1 = ? and item_kate2 = ?';

    let getitemlist = new Promise((resolve, reject) => {
        selectArray = [kate1, kate2]
        dbcon.query(itemSelQuery, selectArray, function (error, results, fields) {
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
    res.render('kateSearch', {
        data: results,
        price: price,
        login_id: req.session.uid,
        kate1: kate1,
        kate2: kate2
    });
});

module.exports = router;