var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function (req, res) {
    // res.render('index');
    res.render('index', { title: 'Hey', message: 'Hello there!' })
});
module.exports = router;