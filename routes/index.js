var express = require('express')
var sha1 = require('sha1')
var config = require('../config')
var router = express.Router()

router.get('/', function(req, res, next) {
  var token = config.wechat.token
  var timestamp = req.query.timestamp
  var nonce = req.query.nonce
  var signature = req.query.signature
  var echostr = req.query.echostr
  var str = [token, timestamp, nonce].sort().join('')
  var sha = sha1(str)

  if (sha === signature) {
    res.send(echostr + '')
  } else {
    res.err(500)
  }
})

module.exports = router
