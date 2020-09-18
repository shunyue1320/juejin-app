const request = require('request')
const util = require('util')
const qs = require('querystring')
const requestPromise = util.promisify(request)

module.exports = function (options) {
  options.method = options.method.toUpperCase()     //请求类型转大写
  if (options.method === 'GET' && options.params) { //是get 有params
    let params = qs.stringify(options.params)       //对象转?a=1&b=2...
    options.url = `${options.url}?${params}`        //拼接地址
  }
  if (
    options.method === 'POST' ||
    options.method === 'PUT' ||
    options.method === 'DELETE'
  ) {
    if (options.body) {
      options.body = JSON.stringify(options.body)
    }
    if (!options.headers) {
      options.headers = {}
    }
    options.headers = {    //给headers添加 Content-Type
      'Content-Type': 'application/json',
      ...options.headers
    }
    return requestPromise(options)
    .then(res=> ({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      headers: res.headers,
      body: res.body
    }))
    .catch(err=> {
      console.error(err)
      return {
        statusCode: -1,
        statusMessage: err,
        headers: res.headers,
        body: { err_no: 1 },
      }
    })
  }
}