const express = require('express');
const session = require('express-session');
const user_session = require('../user_session');

const router = express.Router();

router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: user_session
}));

router.get('/', function (req, res) {
    if (req.session.uid) {
        req.session.destroy(function (error) {
            if (error) throw err;
            res.redirect('/');
        });
    } else {
        res.write("<script type='text/javascript'>alert('비정상적인 접근입니다.');</script>");
        res.write("<script type='text/javascript'>location.href='/'</script>");
    }
});

module.exports = router;