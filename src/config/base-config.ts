import { lg } from '@/util/common/fns/fns'
import { KEY_API } from '@/models/project/local-storage-keys/keys'
import { isDev, isProd } from '@shared/env'

// 可以在这里切换调试的服务器【这里是整体切换，相对而言 dev-config中是局部切换】
// const baseURL = 'http://99.99.99.99:9999/' // 测试环境
let baseURL = 'http://localhost:3002/api' // nodejs 环境
if (isDev()) {
  // 开发环境访问的地址
  baseURL = 'http://localhost:3002'
} else {
  // 生产环境访问的地址
  baseURL = ''
}
const baseWs = 'ws://localhost:3002/'
// window的最小高度
const MIN_WIN_HEIGHT = 450
// 是否关闭 静态请求
const closeStatic = isProd()
// 是否强行开启静态请求 【当且仅当 非开发人员想在生产环境看静态数据时，设置为true】
const openStatic = false
// 文件路径
const fileUrl = ''
// shangyi
const uploadUrl = 'http://devglobal.everjiankang.com.cn/api/global-platform/phoneMapping/uploadAndCreatePhoneInfo'
// xiangrikui
export default {
  /**
   * 这里的配置可以使得在不方便改代码进行调试时，可以在浏览器控制台输入相应的代码进行路径的切换
   * 例如 localStorage.setItem('LF_FE_API', 'http://99.99.99.99:9999/')
   * 表示，所有所有请求都将被发送到 http://99.99.99.99:9999/ 上
   */
  baseURL: lg(KEY_API) || baseURL,
  MIN_WIN_HEIGHT,
  baseWs,
  closeStatic,
  openStatic,
  fileUrl,
  uploadUrl,
}
