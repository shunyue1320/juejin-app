
module.exports = {
  mode: 'universal',
  telemetry: false,
  server: { 
    port: 3000,
    host: '0.0.0.0'
  },
  env: {
    baseUrl: 'http://localhost:3000'
  },
  dev: process.env.NODE_ENV !== 'production',
  router: {
    middleware: [ 'i18n' ],
    extendRoutes (routes, resolve) {
      routes.push({
        path: '/',
        redirect: {
          name: 'home-title'
        }
      })
    },
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  head: {
    title: '掘金',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover' },
      { name: 'referrer', content: 'never'},
      { hid: 'keywords', name: 'keywords', content: '掘金,稀土,Vue.js,微信小程序,Kotlin,RxJava,React Native,Wireshark,敏捷开发,Bootstrap,OKHttp,正则表达式,WebGL,Webpack,Docker,MVVM'},
      { hid: 'description', name: 'description', content: '掘金是一个帮助开发者成长的社区，是给开发者用的 Hacker News，给设计师用的 Designer News，和给产品经理用的 Medium。掘金的技术文章由稀土上聚集的技术大牛和极客共同编辑为你筛选出最优质的干货，其中包括：Android、iOS、前端、后端等方面的内容。用户每天都可以在这里找到技术世界的头条内容。与此同时，掘金内还有沸点、掘金翻译计划、线下活动、专栏文章等内容。即使你是 GitHub、StackOverflow、开源中国的用户，我们相信你也可以在这里有所收获。'}
    ]
  },
  loading: {
    color: '#007fff'
  },
  css: [
    '~/assets/css/page-transition.css',    
    '~/assets/scss/global.scss',
    '~/assets/css/reset.css'
  ],
  plugins: [
    '~/plugins/api/axios.js',
    '~/plugins/api/request.js',
    '~/plugins/api/api.js',
    '~/plugins/vue-global.js',
    '~/plugins/i18n.js',
  ],
  modules: [
    '@nuxtjs/axios', 
    '@nuxtjs/style-resources',
    ['cookie-universal-nuxt', { parseJSON: true }]
  ],
  styleResources: {
    scss: [
      '~/assets/scss/variable.scss'
    ]
  },
  build: {
    babel: {
      plugins: [
        [
          "component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ],
    }
  }
}
