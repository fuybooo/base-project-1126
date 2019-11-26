import { RouteConfig } from 'vue-router'

// 规定meta中的属性
export interface RouteMeta {
  title?: string // 页面标题 & 菜单名称
  hidden?: boolean // 该路由是否应该显示在 menu nav 中隐藏 【当导航数据需要从后台配置时，可以使用该值进行】
  langSetting?: boolean // 是否显示语言设置
  menuName?: string // 菜单名称 当菜单名称与title不同时可以配置该值
  parentName?: string // 当路由只是作为路由，不作为菜单时，这种路由将不会显示在菜单栏中 刷新页面时 将会根据 parentName 高亮对应的菜单
  pagePath?: ProRouteConfig[] // 导航路径，用于显示面包屑导航路径
  icon?: string // 菜单图标样式
  hideBread?: boolean // 是否隐藏面包屑
  hideMenu?: boolean // 是否隐藏左侧菜单
  needNotToken?: boolean // 不需要token的路由
  notAutoPageTitle?: boolean // 是否自动使用pageTitle 根据pattern 显示当前面包屑title
}

export interface ProRouteConfig extends RouteConfig {
  meta: RouteMeta
  name: string
  children?: ProRouteConfig[]
  id?: string | number
  parentId?: string | number
}
