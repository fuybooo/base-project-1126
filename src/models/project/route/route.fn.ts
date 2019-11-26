import { ProRouteConfig, RouteMeta } from '@/models/project/route/route.model'

// 批量设置路由属性
// 例如 要将路由设置为 隐藏路由 setUpRouter(router, {hidden: true})
// 例如 要将路由设置为 不需要token的路由 setUpRouter(router, {needNotToken: true})
export function setUpRouter (router: ProRouteConfig | ProRouteConfig[], meta: RouteMeta = {}): ProRouteConfig | ProRouteConfig[] {
  const routerIsArray = Array.isArray(router)
  if (!routerIsArray) {
    // @ts-ignore
    router = [ router ]
  }
  // @ts-ignore
  router = (router as ProRouteConfig[]).map((item: ProRouteConfig) => {
    return {
      ...item,
      meta: {
        ...item.meta,
        ...meta,
      },
      ...(item.children ? { children: setUpRouter(item.children, meta) } : {}),
    }
  })
  // @ts-ignore
  return routerIsArray ? router : router[0]
}
