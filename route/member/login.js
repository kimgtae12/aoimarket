const express = require('express');
const dbcon = require('../../db/config');
const session = require('express-session');
const user_session = require('../user_session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

const router = express.Router();

// bodyParser -  body에서 uid와 upw 정보를 가져온다.
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

//session 설정 세션을 이용하기 위해선 세션을 저장할 공간이 필요.
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: user_session
}));

//login 페이지 불러오기.
router.get('/', function (req, res) {
    res.setHeader('Content-type', 'text/html;charset=UTF-8');
    if (!req.session.uid) {
        res.render('login', {
            login_id: req.session.uid
        });
    }
    else {
        res.write("<script type='text/javascript'>alert('비정상적 접근-이미 로그인된 상태입니다.');</script>");
        res.write("<script type='text/javascript'>location.href='/'</script>");
    }
}
);

//login 기능
router.post('/', function (req, res) {
    //기존 session clear
    req.session.input_id = "";
    req.session.email = "";
    req.session.key = "";

    //입력된 id,pw 정보를 가져온다. (body-parser 모듈 사용.)
    let uId = req.body.uId;
    let uPw = req.body.uPw;

    //인증이 되지 않은 아이디의 경우 아이디를 이용해 이메일 재전송 기능 제공.
    req.session.input_id = uId;
    req.session.save();

    // start login logic
    if (uId && uPw) {
        dbcon.query('select * from member where aId = ?', [uId], function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                if (!bcrypt.compareSync(uPw, results[0].aPw)) {
                    res.send('<script type="text/javascript">' +
                        'alert("비밀번호가 일치하지 않습니다.");' +
                        'document.location.href="/login";</script>');
                }
                else {
                    dbcon.query('select certifi from member where aId=?', [uId], function (er, certifi, fields) {
                        if (er) throw er;
                        if (certifi[0].certifi == 'ok') { //로그인 인증이 완료된 계정이라면 로그인.
                            req.session.name = results[0].aName;
                            req.session.uid = results[0].aId;
                            req.session.isLogined = true;
                            req.session.save(function () {
                                res.redirect('/');
                            });
                        }
                        else { //그렇지 않을경우 이메일 인증사이트로 이동.
                            res.write("<script type='text/javascript'>location.href='/emailCheck'</script>");
                        }
                    });
                    //session store -> redirect
                }
            } else { //아이디와 비밀번호가 틀렸다면?
                res.send('<script type="text/javascript">' +
                    'alert("로그인정보가 존재하지 않습니다.");' +
                    'document.location.href="/login";</script>');
            }
        });
    } else { //아디디 또는 비밀번호가 입력되지 않았다면?
        res.send('<script type="text/javascript">' +
            'alert("아이디와 비밀번호 모두 입력해주세요.")' +
            'document.location.href="/login";</script>');
        res.end();
    }
});



module.exports = router;