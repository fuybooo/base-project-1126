import { ProRouteConfig } from '@/models/project/route/route.model'
import Main from '@/modules/main/Main.vue'
import MainHome from '@/modules/main/MainHome.vue'
import demoRouter from '@/demo/router/router'

export const mainRoute: ProRouteConfig = {
  path: '/main',
  name: 'main',
  redirect: { name: 'home' },
  component: Main,
  // @ts-ignore
  children: [
    {
      path: '',
      name: 'home',
      component: MainHome,
      meta: {
        title: 'Home',
        hideBread: true,
        hideMenu: false,
        hidden: true,
      },
    },
    demoRouter,
  ],
  meta: {
    title: 'main',
  },
}
