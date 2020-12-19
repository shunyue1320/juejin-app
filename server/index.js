const fs  = require('fs')
const Koa  = require('koa')
const cors = require('koa2-cors')
const helmet = require('koa-helmet')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = new Koa()
const router = new Router()

const config = require('../nuxt.config.js')

function useMiddleware() {
  app.use(helmet())      //提供了重要的安全标头，默认情况下使您的应用程序更安全
  app.use(bodyParser())  //解析body 支持 json from text
  //设置请求返回头
  app.use(cors({
    origin: function (ctx) {
      return 'http://localhost:3000'
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 86400,
    credentials: true,                       //允许携带头部验证信息
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Token', 'X-Device-Id', 'X-Uid'],
  }))
}

function useRouter(path) {
  path = path || __dirname + '/routes'       //递归后：C:.../routes/v2
  //注册路由
  let urls = fs.readdirSync(path)            //返回文件名 递归后：[ 'xxx.js', 'xx.js' ]
  urls.forEach((element) => {
    const elementPath = path + '/' + element // 第二次'.../routes/v2/xxx.js'
    const stat = fs.lstatSync(elementPath)   //读取每个文件的信息
    const isDir = stat.isDirectory()         //判断是否是文件夹
    if (isDir) {                             //是文件夹递归这个文件夹
      useRouter(elementPath)
    } else {                                 //不是 引入模块
      let module = require(elementPath)      //elementPath = '.../routes/v2/xxx.js'
      let routerRrefix = path.split('/routes')[1] || ''
      //routes里的文件名作为 路由名 如： ('/v2/auth',  开启路由 嵌套 module 内路由)
      router.use(routerRrefix + '/' + element.replace('.js', ''), module.routes())
    }
  })
  //使用路由  allowedMethods：当用post请求get接口时提供报错
  app.use(router.routes()).use(router.allowedMethods()) 
}

async function start() {
  const nuxt = new Nuxt(config)
  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  useMiddleware()  //设置请求返回头
  useRouter()      //设置路由 嵌套

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false
    ctx.req.ctx = ctx
    nuxt.render(ctx.req, ctx.res)   //接收请求渲染页面
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()