//批量注册common文件夹内的组件
export default {
  install(Vue) {
    const components = require.context('~/components/common', false, /\.vue$/)
    components.keys().map(path => {
      const CompontentName = path.replace(/(.*\/)*([^.*]+).*/, '$2')
      Vue.component(CompontentName, components(path).default || components(path))
    })
  }
}