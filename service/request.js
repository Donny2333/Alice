const axios = require('axios')

export const request = (url, options = {}, method = 'get') => {
  let key = ~['get', 'head'].indexOf(method) ? 'params' : 'data'
  return axios(Object.assign({
    'url': jointUrl + url,
    'method': method,
    'validateStatus': false,
    'withCredentials': true
  }, {[key]: options}))
}
