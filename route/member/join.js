const express = require('express');
const dbcon = require('../../db/config');
const session = require('express-session');
const user_session = require('../user_session');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');

//emailHandler의 모듈을 가져옴.
const handle_email = require('../member/emailHandler');

const router = express.Router();
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));


//body-parser 설정.
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());


//session 설정.
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: user_session
}));


//이메일 인증번호 만들기. crypto 모듈 사용.
var key_one = crypto.randomBytes(256).toString('hex').substr(100, 5);
var key_two = crypto.randomBytes(256).toString('base64').substr(50, 5);
var key_for_verify = key_one + key_two;

//회원가입 페이지 get 요청.
router.route('/').get((req, res) => {
    res.setHeader('Content-type', 'text/html;charset=UTF-8');
    if (!req.session.uid) {
        res.render('join', {
            login_id: req.session.uid
        });

    }
    else {
        res.write("<script type='text/javascript'>alert('비정상적 접근 - 이미 로그인된 상태입니다.');</script>");
        res.write("<script type='text/javascript'>location.href='/'</script>");
    }

});


// start join logic 
router.route('/join_ok').post(async (req, res) => {
    res.setHeader('Content-type', 'text/html;charset=UTF-8');

    //사용자가 입력한 정보를 가져옴.
    let join_id = req.body.uId;
    let join_pw = req.body.uPw;
    let join_name = req.body.uName;
    let join_email = req.body.uEmailFirst + "@" + req.body.uEmailSecond;
    let join_phone = req.body.uPhone;

    console.log(req.body.uEmailSecond);
    let today = new Date();
    let join_date = today.toLocaleString().toString();

    //메인 인증에서 사용하기 때문에 id와 이메일을 세션에 저장.
    req.session.input_id = join_id;
    req.session.email = join_email;

    //handler에 이메일과 키값 전송. (email-handler.js에 있는 EmailVerification메소드)


    //sql문 작성.
    var select_id = "select aId from member where aId = ?";
    var select_email = "select aEmail from member where aEmail = ?";
    var sql_key = "insert into verifykey values('" + join_id + "','" + join_email + "','" + key_for_verify + "')";
    var sql_member = "insert into member values('" + join_id + "','" + join_pw + "','" + join_name + "','" + join_email + "','" + join_phone + "','" + join_date + "','fail')";

    let selectId = new Promise((resolve, reject) => {
        dbcon.query(select_id, join_id, function (err, result) {
            if (err) {
                reject(err);
            }
            if (result.length > 0) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    });

    let noneOvlabId = await selectId;

    let selectEmail = new Promise((resolve, reject) => {
        dbcon.query(select_email, join_email, function (err, result) {
            if (err) {
                reject(err);
            }
            if (result.length > 0) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    });

    let noneOvlabEmail = await selectEmail;

    if (noneOvlabId != true) {
        res.write('<script type="text/javascript">alert("중복된 아이디가 존재합니다."); history.back();</script>');
    }
    /*else if (noneOvlabEmail != true) {
        res.write('<script type="text/javascript">alert("중복된 이메일이 존재합니다."); history.back();</script>');
    }*/
    else {
        handle_email.EmailVerification(join_email, key_for_verify);
        //인증키 테이블에 아이디와 인증키 저장.
        dbcon.query(sql_key, function (err, result) {
            if (err) {
                console.error(err);
                throw err
            }
            console.log('userkey insert complete!');
            res.end();
        });

        //유저 정보 저장.
        dbcon.query(sql_member, function (err, result) {
            if (err) {
                console.error(err);
                throw err;
            }
            console.log("userinfo insert complete!");
            res.end();
        });
        res.redirect('/emailCheck');
    }

});




module.exports = router;