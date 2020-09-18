/**
 * 参数验证中间件
 * 使用规则参考 async-validator
 */

 const { default: Schema } = require('async-validator')

 module.exports = function(descriptor) { //descriptor 校验器
  return async function(ctx, next) {
    let validator = new Schema(descriptor)
    let params = {}
    //获取params
    if (ctx.method === 'GET') {
      Object.keys(descriptor).forEach(key => {
        params[key] = ctx.query[key]  //get就 ctx.query 读取 key
      })
    } else if (ctx.method === 'POST' || ctx.method === 'PUT' || ctx.method === 'DELETE') {
      Object.keys(descriptor).forEach(key => {
        params[key] = ctx.request.body[key]
      })
    }
    const errors = await validator.validate(params)
    .then(() => null)
    .catch(err => err.errors)
    if (errors) {
      ctx.body = {
        err_no: 1,
        errors
      }
    } else {
      await next()
    }
  }
 }