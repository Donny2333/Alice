const config = require("../config")
const request = require('./request')

let token = {}

const getToken = async () => {
  // Todo: check token is available
  try {
    if (!token.access_token || Date.now() - token.create_at >= token.expires_in) {
      const res = (await request(`https://api.weixin.qq.com/cgi-bin/token`, {
        grant_type: 'client_credential',
        appid: config.wechat.appID,
        secret: config.wechat.secret
      }, 'GET'))
      if (res.data.access_token) {
        token = {
          create_at: Date.parse(res.headers['date']),
          access_token: res.data.access_token,
          expires_in: res.data.expires_in
        }
      }
      console.log(token)
    }
  } catch (err) {
    console.log(err)
  }
  return token
}

const menuCreate = async options => {
  await request(` https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${getToken().access_token}`, options, 'POST')
}

module.exports = {
  menuCreate
}
