import Vue from 'vue'
import componentsInstall from '~/components/componentsInstall'
import eleComponentsInstall from '~/components/eleComponentsInstall'
import loginModal from '~/components/common/loginModal'  //实例化的登入弹窗组件
import '~/assets/scss/element-variables.scss' // elementUI 自定义主题色
import utils from '~/utils/utils'

//全局组件
Vue.use(loginModal)
Vue.use(componentsInstall)
Vue.use(eleComponentsInstall)

//全局管道
Vue.filter('formatTime', d => utils.formatTime(d))

export default function (context, inject) {
  inject('utils', utils)
}