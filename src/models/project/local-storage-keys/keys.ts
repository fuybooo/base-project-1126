// tslint:disable-next-line:no-var-requires
import { projectPrefix } from '@shared/model'

const p = projectPrefix + 'FE_'
// const p = 'VUE_'
// ----------------------------------------------------------------------------
// 框架的配置
// ----------------------------------------------------------------------------
/**
 * 这里的配置可以使得在不方便改代码进行调试时，可以在浏览器控制台输入相应的代码进行路径的切换
 * 例如 localStorage.setItem('LF_FE_API', 'http://99.99.99.99:9999/')
 * 表示，所有所有请求都将被发送到 http://99.99.99.99:9999/ 上
 */
export const KEY_API = p + 'API'
/**
 * 【优先级高于 KEY_API】
 * 这里的配置可以使得在不方便改代码进行调试时，可以在浏览器控制台输入相应的代码进行路径的切换
 * 例如 localStorage.setItem('LF_FE_SUB_API_/staff/', 'http://99.99.99.99:9999/')
 * 表示，所有请求路径中带有 /staff/ 的请求，都将被发送到 http://99.99.99.99:9999/ 上
 */
export const KEY_SUB_API = p + 'SUB_API_'
export const KEY_WS_USERNAME = p + 'WS_USERNAME'
/**
 * 强制开启/关闭静态请求，即，该值设置为 '1' 后，不论是生产环境，还是开发环境，都取 url配置中都 isStatic；为 '0' 则所有接口都走后台
 * 例如 localStorage.setItem('LF_FE_OPEN_STATIC', '1') // 取静态数据
 * localStorage.setItem('LF_FE_OPEN_STATIC', '0') // 不取静态数据
 */
export const KEY_OPEN_STATIC = p + 'OPEN_STATIC'
// 暂时没用到这两个属性
// 当 开启静态数据时 KEY_STATIC_EXCLUDE 设置的数组 会取后台数据
export const KEY_STATIC_EXCLUDE = p + 'STATIC_EXCLUDE'
// 当 关闭静态数据时 KEY_STATIC_INCLUDE 设置的数组 会取静态数据
// 例如：localStorage.setItem('LF_FE_STATIC_INCLUDE', '["campus/", "staff/"]')
export const KEY_STATIC_INCLUDE = p + 'STATIC_INCLUDE'
// 与框架相关的 key list
export const FRAMEWORK_KEY_LIST = [
  KEY_API,
  KEY_SUB_API,
  KEY_WS_USERNAME,
  KEY_OPEN_STATIC,
  KEY_STATIC_EXCLUDE,
  KEY_STATIC_INCLUDE,
]
// ----------------------------------------------------------------------------
// 业务上的配置
// ----------------------------------------------------------------------------
export const KEY_LANG = p + 'LANG'
// export const KEY_IP = p + 'IP'
// 登录相关
export const KEY_TOKEN = p + 'TOKEN'
export const KEY_USERNAME = p + 'USERNAME'
export const KEY_UID = p + 'UID'
export const KEY_POSITION = p + 'POSITION'
export const KEY_USER_INFO = p + 'USER_INFO'
// 菜单类型
export const KEY_MENU_FLAG = p + 'MENU_FLAG'
// 当前校区
export const KEY_CAMPUS_ID = p + 'CAMPUS_ID'

