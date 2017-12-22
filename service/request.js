const axios = require('axios')

module.exports = (url, options = {}, method = 'get') => {
  let key = ~['get', 'head'].indexOf(method.toLowerCase()) ? 'params' : 'data'
  return axios(Object.assign({
    'url': url,
    'method': method,
    'validateStatus': false,
    'withCredentials': true
  }, {[key]: options}))
}
