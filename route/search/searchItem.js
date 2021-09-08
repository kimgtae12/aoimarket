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
    let searchKeyword = "%" + req.query.itemName + "%";
    let renderKeyword = searchKeyword.replace(/%/g, "");
    let itemSelQuery = 'select * from itemlist where replace(item_title," ","") like ? or replace(item_kate1,"/","") like ? or replace(item_kate2,"/","") like ?';
    let getitemlist = new Promise((resolve, reject) => {
        selectArray = [searchKeyword, searchKeyword, searchKeyword]
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
    res.render('searchItem', {
        data: results,
        price: price,
        login_id: req.session.uid,
        search_item: renderKeyword
    });
});

module.exports = router;