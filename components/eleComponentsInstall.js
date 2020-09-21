//挂载需要用到的 element-ui 组件
import { Input, Avatar, Dropdown, DropdownMenu, DropdownItem, Button, ButtonGroup, Select, Option, Notification, Message } from 'element-ui'

export default {
  install(Vue) {
    Vue.use(Input)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(Button)
    Vue.use(ButtonGroup)
    Vue.use(Avatar)
    Vue.use(Dropdown)
    Vue.use(DropdownMenu)
    Vue.use(DropdownItem)
    Vue.prototype.$message = Message
    Vue.prototype.$notify  = Notification
  }
}