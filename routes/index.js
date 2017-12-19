const express = require('express')
const sha1 = require('sha1')
const config = require("../config")
const menus = require('../config/menus')
const menuCreate = require("../service/api").menuCreate
const router = express.Router()

menuCreate(menus)

router.get('/', function (req, res, next) {
  const token = config.wechat.token
  const timestamp = req.query.timestamp
  const nonce = req.query.nonce
  const signature = req.query.signature
  const echostr = req.query.echostr
  const str = [token, timestamp, nonce].sort().join('')
  const sha = sha1(str)

  if (sha === signature) {
    res.send(echostr + '')
  } else {
    res.status(500).json({errMsg: 'sha is not equal to signature'})
  }
})

module.exports = router
