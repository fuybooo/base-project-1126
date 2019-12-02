import { Menu } from '@/components/common-menu/menu.model'
import { ProRouteConfig } from '@/models/project/route/route.model'
import { defaultTitle } from '@/models/project/models'
import demoRoute from '@/demo/router/router'
import { convertListToTree } from '@/util/common/fns/fns-tree'

export function transferRoutesToMenus (routes: ProRouteConfig[], parentRoute?: ProRouteConfig): Menu[] {
  return routes.map(menuItem => {
    // @ts-ignore
    menuItem.meta.pagePath = parentRoute ? [
      ...(parentRoute.meta.pagePath || []),
      parentRoute,
      // 目前只考虑父路由在同级下的情况
      ...(menuItem.meta.parentName ? [ routes.find(item => item.name === menuItem.meta.parentName) ] : []),
      menuItem,
    ] : []
    // 将每个菜单节点构建成树节点的形式
    return {
      id: menuItem.name,
      parentId: parentRoute ? parentRoute.id || '' : '',
      index: menuItem.name, // 这里要求route中的name是必填且唯一的
      hidden: !!menuItem.meta.hidden,
      parentName: menuItem.meta.parentName || '',
      title: menuItem.meta ? (menuItem.meta.menuName || menuItem.meta.title) : defaultTitle,
      ...(menuItem.children ? { children: transferRoutesToMenus(menuItem.children, menuItem) } : {}),
      icon: menuItem.meta ? menuItem.meta.icon : '',
    }
  })
}

// 转换前端的菜单
export function getDefaultMenus () {
  // return transferRoutesToMenus(mainRoute.children || [])
  // @ts-ignore
  return transferRoutesToMenus(demoRoute.children || [])
}

// 转换后端的菜单
export function getMenus (list: any[]) {
  return convertListToTree(list)
}

// 根据菜单标志获取相应的菜单
export function getMenusByMenuFlag (menuFlag: string) {
  // 将特性路由和公共路由合并起来 【只有公共路由在所有路由中，bread才能正常显示】
  // @ts-ignore
  return demoRoute.children
}
