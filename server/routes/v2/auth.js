const Router = require('koa-router')
const request = require('../../request')
const validator = require('../../middleware/validator')
const router = new Router()


/**
 * 登录
 * @param {string} password - 密码
 * @param {string} phoneNumber - 手机号码或邮箱
 */

 //路由嵌套通过 /v2/auth/login 进来
router.post('/login', validator({  //校验中间件
password: { type: 'string', required: true },
phoneNumber: { type: 'string', required: true }
}), async (ctx) => {
  const options = {
    url: 'https://juejin.im/auth/type/phoneNumber',
    // url: 'https://juejin.im/passport/web/user/login/?account_sdk_source=web',
    method: 'POST',
    body: {
      password: ctx.request.body.password,
      phoneNumber: ctx.request.body.phoneNumber
      // account: '2e3d33343030323c333631303032',
      // password: '423232303d37303d',
      // captcha: '',
      // aid: 2608,
      // is_sso: false,
      // host: '',
      // mix_mode: 1
    }
  }
  let { body } = await request(options) //交给 request 去发起请求
  console.log("body:::", body);
  ctx.body = body
})

router.get('/authentication', async (ctx) => {
  const headers = ctx.headers
  const options = {
    url: 'https://xiaoce-discount-storage-api-ms.juejin.im/v1/getNewUserDiscountTicketDetail',
    method: 'GET',
    params: {
      src: 'web',
      uid: headers['x-uid'],
      client_id: headers['x-device-id'],
      token: headers['x-token']
    }
  }
})

 module.exports = router