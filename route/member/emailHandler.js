const nodemailer = require('nodemailer');

//서비스할 메일 정보, 내 정보 입력.
const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "kimgtea12@gmail.com",
        pass: "rlarudxo89"
    },
    tls: {
        rejectUnauthorized: false
    }
});


//모듈 추출. 
module.exports = {
    //보내는사람, 받는사람의 정보를 입력해줌. 그리고 제목, 내용 입력.
    EmailVerification(email, key) {
        const mailOption = {
            from: 'aoimarket',
            to: email,
            subject: "aoimarket 회원가입 인증 메일입니다.",
            html: "<b>vertification code: </b>" + key
        }

        //옵션을 이용해 메일 전송메소드 실행.
        smtpTransport.sendMail(mailOption, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("전송완료");
            }
        });
    }
}