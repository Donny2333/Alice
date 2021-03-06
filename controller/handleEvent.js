const xml2js = require('xml2js')
const sha1 = require('sha1')
const config = require('../config')
const tools = require('../utils/tools')

// 微信服务器连接响应
const echo = (req, res) => {
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
}

// 处理用户发送过来的消息
const msg = (req, res) => {
  let xml = ''

  req.on('data', chunk => {
    xml += chunk
  })

  // 接收结束
  req.on('end', () => {
    xml2js.parseString(xml, {explicitArray: false}, function (err, json) {
      if (err) {
        console.error(err)
        return res.end()
      }
      const backTime = new Date().getTime()

      if (json.xml.MsgType === 'event') {
        switch (json.xml.Event.toLowerCase()) {
          case 'subscribe':
            console.log(json.xml)
            res.send(tools.getXml(json, backTime, `终于等到你，还好我没放弃`))
            break

          case 'click':
            res.send(tools.getXml(json, backTime, '你戳我干啥...'))
            break

          default:
            break
        }
      } else if (json.xml.MsgType === 'text') {
        res.send(tools.getXml(json, backTime, `你发"${json.xml.Content}"过来干啥？`))
      }
    })
  })
}

module.exports = {
  echo,
  msg
}
