const { response } = require('express');
const express = require('express');
const dbcon = require('../../db/config');
const session = require('express-session');
const user_session = require('../user_session');
const bodyParser = require('body-parser');
const multer = require('multer');


const { Storage } = require('@google-cloud/storage');

const router = express.Router();
const app = express();

//body-parser 설정.
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

router.route('/').get(function (req, res) {
    res.render('item/itemSubmmit', {
        login_id: req.session.uid
    });
});

/*
const uploadItemImage = multer({
    dest: '/public/upload/'
})*/

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({ storage: storage });

router.route('/').post(upload.array('img_name'), (req, res) => {

    let today = new Date();

    let item_title = req.body.item_title;
    let item_admin = req.session.uid;
    let item_price = req.body.item_price;
    let item_trade = req.body.item_trade;
    let item_date = today.toLocaleString().toString();
    let item_stat = req.body.item_stat;
    let item_comment = req.body.item_info;

    let kate = req.body.item_kate;
    let split_kate = kate.split(' - ');
    let item_kate1 = split_kate[0];
    let item_kate2 = split_kate[1];


    //Google Cloud Storage Upload
    // The ID of your GCS bucket
    const bucketName = 'itemimgbucket';

    for (var i = 0; i <= req.files.length - 1; i++) {
        // The path to your file to upload
        let filePath = 'uploads/' + req.files[i].filename;

        // The new ID for your GCS file
        let destFileName = 'itemlist/' + req.session.uid + '/' + req.files[i].filename;

        const storage = new Storage({ keyFilename: 'aoiproject-c565b846005b.json' });

        async function uploadFile() {
            await storage.bucket(bucketName).upload(filePath, {
                destination: destFileName,
            });

            console.log(`${filePath} uploaded to ${bucketName}`);
        }

        uploadFile().catch(console.error);
    }
    for (let i = 0; i <= req.files.length - 1; i++) {
        console.log(req.files[i]);
    }


    //DB Upload
    let searchIdx = 'select max(item_id) as max_idx from itemlist'
    let cloudurl = 'https://storage.googleapis.com/itemimgbucket/itemlist/' + req.session.uid + '/';

    let max_idx, item_first, item_second, item_third;

    if (req.files[0]) {
        item_first = cloudurl + req.files[0].filename;
    }
    else {
        item_first = null;
    }
    if (req.files[1]) {
        item_second = cloudurl + req.files[1].filename;
    }
    else {
        item_second = null;
    }
    if (req.files[2]) {
        item_third = cloudurl + req.files[2].filename;
    }
    else {
        item_third = null;
    }


    dbcon.query(searchIdx, function (err, result) {
        if (err) {
            console.error(err);
            throw err;
        }
        let insertItem = 'insert into itemlist values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        let max_idx;
        if (result[0].max_idx == 0) {
            max_idx = 0;
        }
        else {
            max_idx = result[0].max_idx + 1;
        }

        let insertItemKey = [max_idx,
            item_title,
            item_admin,
            item_price,
            item_first,
            item_second,
            item_third,
            item_trade,
            item_date,
            item_stat,
            item_comment,
            item_kate1,
            item_kate2,
            '판매중',
            0
        ];
        dbcon.query(insertItem, insertItemKey, function (err, result) {
            if (err) {
                console.error(err);
                throw err;
            }
            console.log("iteminfo insert complete!");
            res.redirect('/');
        });
        console.log(result[0].max_idx);
    });

});


module.exports = router;