import Vue from 'vue'
import loginModal from './loginModal'

//实例化组件
let componentInstance = null
let ModalConstructor = Vue.extend(loginModal)

function createModal() {
  componentInstance = new ModalConstructor()
  document.body.appendChild(componentInstance.$mount().$el)
}

function caller(ctx) {
  //单例模式 同时只能存在一个登入弹窗
  if (!componentInstance) {
    createModal()
    //实例化组件没有this,所以需要手动传，回调函数的作用是 单例模式
    return componentInstance.show(ctx, () => { componentInstance = null })
  }
}

export default {
  install(Vue) {
    Vue.prototype.$loginModal = caller
  }
}