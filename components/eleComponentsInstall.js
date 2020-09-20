//挂载需要用到的 element-ui 组件
import { Input, Button, ButtonGroup, Select, Option, Notification, Message } from 'element-ui'

export default {
  install(Vue) {
    Vue.use(Input)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(Button)
    Vue.use(ButtonGroup)
    Vue.prototype.$message = Message
    Vue.prototype.$notify  = Notification
  }
}