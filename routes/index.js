import express from 'express'
import sha1 from 'sha1'
import menus from '../config/menus'
import {menuCreate} from "../service/api"

const router = express.Router()

menuCreate(menus)

router.get('/', function (req, res, next) {
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
    res.status(500).json({errMsg: 'sha is not equal to signature'})
  }
})

module.exports = router
