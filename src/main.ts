import Vue from 'vue'
import ElementUI from 'element-ui'
import ECharts from 'vue-echarts/components/ECharts.vue'
import './assets/less/common/element-variable.scss'
import './assets/less/common/index.less'
import './assets/less/project/index.less'
import App from './App.vue'
import router from './router/router'
import store from './stores/store'
import './registerServiceWorker'
import { i18n } from '@/config/i18n-config'
// 在vue实例上绑定属性
import '@/util/common/vue-prototype/vue-prototype'
// 导入公共组件
import '@/components/index'
// 导入业务方法
import '@/util/project/biz/index'
// tslint:disable-next-line:no-var-requires
Vue.use(ElementUI, {zIndex: 3000})
Vue.component('v-chart', ECharts)
Vue.config.productionTip = false
window._vueInstance_ = new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
