import Vue from 'vue'
import Router, { Route } from 'vue-router'
import Login from '@/modules/login/Login.vue'
import Forgot from '@/modules/login/Forgot.vue'
import Register from '@/modules/login/Register.vue'
import { gc, lg } from '@/util/common/fns/fns'
import { KEY_LANG, KEY_TOKEN } from '@/models/project/local-storage-keys/keys'
import { i18n, loadLanguageAsync } from '@/config/i18n-config'
import store from '@/stores/store'
import { toggleLangSetting } from '@/stores/mutation-types'
import { ProRouteConfig } from '@/models/project/route/route.model'
import { mainRoute } from '@/router/main.router'
// import demoRouter from '@/demo/router/router'

const originPush = Router.prototype.push
// 解决重复路由跳转的问题
// @ts-ignore
Router.prototype.push = function push (location) {
  const res = originPush.call(this, location)
  // @ts-ignore
  if (res) {
    // @ts-ignore
    return res.catch((err: any) => err)
  }
  return res
}

Vue.use(Router)

const routes: ProRouteConfig[] = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: 'title.Login',
      needNotToken: true,
    },
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: Forgot,
    meta: {
      title: 'title.Forgot',
      needNotToken: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: 'title.Register',
      needNotToken: true,
    },
  },
  // @ts-ignore
  // demoRouter,
  mainRoute,
  {
    path: '*',
    name: '*',
    redirect: { name: 'login' },
    meta: {
      title: '*',
    },
  },
]
const router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes,
})
// 前置守卫
router.beforeEach((to, from, next) => {
  // 根据路由元信息判断是否应该显示语言选择器
  toggleLangSettingByTo(to)
  // 异步加载语言环境
  loadLanguageAsync(lg(KEY_LANG) || 'cn').then(() => {
    // 根据语言设置title
    setTitle(to)
    const isLogin = !!gc(KEY_TOKEN)
    if (isLogin || (!isLogin && to.meta.needNotToken)) {
      next()
    } else {
      next({ name: 'login' })
    }
  })
})
export default router

function toggleLangSettingByTo (to: Route) {
  store.commit(toggleLangSetting, to.meta.langSetting)
}

export function setTitle (to: Route) {
  const defaultTitle = 'title.LF'
  const title = to.meta ? to.meta.title || defaultTitle : defaultTitle
  // @ts-ignore
  document.title = title === defaultTitle ? defaultTitle : (i18n.t(defaultTitle) + ' - ' + i18n.t(to.meta ? to.meta.title || defaultTitle : defaultTitle))
}
