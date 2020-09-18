const webpack = require('webpack')

// export default {
module.exports = {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  // target: 'server',
  server: {
    port: 3000,
    host: '127.0.0.1'
  },

  env: {
    baseUrl: 'http://127.0.0.1:3000'
  },
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
 router: {
  middleware: ['i18n'],
  extendRoutes (routes, resolve) {
    routes.push({
      path: '/',
      redirect: {
        name: 'index'
      }
    })
  }
},

  head: {
    title: '掘金',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    'ant-design-vue/dist/antd.css',
    '~/assets/css/reset.css',
  ],

  plugins: [
    '~/plugins/axios.js',
    '~/plugins/request.js',
    '~/plugins/api.js',
    '~/plugins/i18n',
    '~/plugins/antd-ui',
    '~/plugins/vue-global',
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  // components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules  
  */
  modules: [
    '@nuxtjs/axios',           //注入$axios
    'cookie-universal-nuxt',   //注入$cookie
    '@nuxtjs/style-resources', //解析cass
  ],

  styleResources: {
    scss: [
      '~/assets/scss/variable.scss'
    ]
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    transpile: [/^ant-design-vue/],
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash'  //js文件中使用
      })
    ]
  }
}
