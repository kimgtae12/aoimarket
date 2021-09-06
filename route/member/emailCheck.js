const express = require('express');
const dbcon = require('../../db/config');
const session = require('express-session');
const user_session = require('../user_session');
const bodyParser = require('body-parser');
const path = require('path');

const handle_email = require('../../route/member/emailHandler');

const router = express.Router();
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: user_session
}));

//인증키를 넣은 페이지.
router.route('/').get(function (req, res) {
    res.setHeader('Content-type', 'text/html;charset=UTF8');
    res.render('emailCheck', {
        login_id: req.session.uid,
        session_id: req.session.input_id/*,
        session_email: req.session.email,
        session_key: req.session.key*/,
        pass: false
    });
});



router.route('/retryEmail').get(function (req, res) {

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    const stringLength = 6;
    let randomstring = ''
    for (let i = 0; i < stringLength; i++) {
        const rnum = Math.floor(Math.random() * chars.length)
        randomstring += chars.substring(rnum, rnum + 1)
    }

    let join_id = req.query.join_id;

    console.log(join_id);
    let select_query = 'select * from member where aId = ?';
    let update_query = 'update verifykey set verifyKey = ? where aId = ? and aEmail = ?';

    dbcon.query(select_query, join_id, function (err, result) {
        if (err) {
            console.log(err);
            throw err;
        }
        else {
            let updateArray = [randomstring, join_id, result[0].aEmail];
            handle_email.EmailVerification(result[0].aEmail, randomstring);
            dbcon.query(update_query, updateArray, function (error) {
                if (error) {
                    console.log(error);
                    throw error;
                }
            });
        }
    });

    res.redirect('/emailCheck');
});

//start verify logic
router.route('/verify').post(function (req, res) {
    res.setHeader('Content-type', 'text/html;charset=UTF-8');

    //세션에 저장된 입력아이디와 사용자가 입력한 인증키를 가져온다.
    let userInputId = req.session.input_id;
    var inputVerify = req.body.verify;

    //인증키 조회.
    var selectVer = "select verifyKey from verifykey where aId = '" + userInputId + "'";
    dbcon.query(selectVer, function (error, results, fields) {
        if (error) {
            console.log(error);
            throw error;
        }
        let dbVerify = results[0].verifyKey;
        console.log(dbVerify);

        //인증키가 일치할 경우.
        if (dbVerify != inputVerify) {
            res.write('<script type="text/javascript">alert("인증키가 잘못되었습니다."); location.href="/emailCheck"</script>');
            res.end();
        }
        //인증키가 일치하지 않을경우.
        else {
            //인증정보 업데이트
            let grantJoin = "update member set certifi = 'ok' where aId ='" + userInputId + "'";
            dbcon.query(grantJoin, function (er, re) {
                if (er) {
                    console.log(er);
                    throw er;
                }
            });
            //입력된 모든 세션입력정보 삭제.
            req.session.destroy(function () {
                req.session;
            });
            res.write('<script type="text/javascript">alert("회원가입이 완료되었습니다."); location.href="/"</script>');
            res.end();
        }

    });
})

module.exports = router;