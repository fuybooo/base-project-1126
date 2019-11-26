import { lg } from '@/util/common/fns/fns'
import { KEY_SUB_API } from '@/models/project/local-storage-keys/keys'

/**
 * 前端开发人员在调试代码时，在这里配置路径将某些API指向固定的URL，比如指定的开发服务器，或者指定的测试服务器，或者后台某个开发人员的开发机器
 */
let debugMap: any = {
  // 如果匹配到url中包含 /unify/ 则将请求发送到 http://99.99.99.99:9999/ 中去
  // 'login': 'http://99.99.99.99:9999/',
  'platform-': 'http://99.99.99.99:9999/',
}

export function debugReq (req: any) {
  // 从localStorage中匹配
  /**
   * 这里的配置可以使得在不方便改代码进行调试时，可以在浏览器控制台输入相应的代码进行路径的切换
   * 例如 localStorage.setItem('LF_FE_SUB_API_/staff/', 'http://99.99.99.99:9999/')
   * 表示，所有请求路径中带有 /staff/ 的请求，都将被发送到 http://99.99.99.99:9999/ 上
   */
  debugMap = {
    ...debugMap,
    ...Object.keys(localStorage)
      .filter(item => item.startsWith(KEY_SUB_API))
      .map(item => ({
        [item.replace(KEY_SUB_API, '')]: lg(item),
      })).reduce((p, c) => ({ ...p, ...c }), {}),
  }
  const debugKey = Object.keys(debugMap).find(key => req.url.includes(key))
  if (debugKey) {
    req.baseURL = debugMap[debugKey]
  }
}
