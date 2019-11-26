import Vue from 'vue'

const vue = new Vue()
// 全局事件处理器
Vue.prototype.$globalEvent = vue

interface GlobalEvent {
  resetMenu: string
  resetHome: string
}

export default GlobalEvent
const $event: GlobalEvent = {
  resetMenu: 'resetMenu',
  resetHome: 'resetHome',
}
Vue.prototype.$event = $event
