var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
  if (!req.body.username) {
    res.render('index', {title: 'Express'});
  } else {
    res.render('user', {title: 'Express', username: req.body.username});
  }
});

module.exports = router;
