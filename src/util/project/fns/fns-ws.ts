import Vue from 'vue'
import config from '@/config/base-config'
import { lg } from '@/util/common/fns/fns'
import { KEY_WS_USERNAME } from '@/models/project/local-storage-keys/keys'

// 创建 websocket
export function createWs (username: string, cbMap: any) {
  // @ts-ignore
  const me = this
  if (!username.trim()) {
    Vue.prototype.$error('请填写用户名')
    return
  }
  // 创建 websocket 连接
  Vue.prototype.$ws = new WebSocket(config.baseWs + wsParams({ username }))
  // tslint:disable-next-line:only-arrow-functions
  Vue.prototype.$ws.onopen = function () {
    if (cbMap && cbMap.onopen) {
      cbMap.onopen.bind(me)()
    }
  }
  // tslint:disable-next-line:only-arrow-functions
  Vue.prototype.$ws.onmessage = function (evt: any) {
    if (cbMap && cbMap.onmessage) {
      cbMap.onmessage.bind(me)(evt)
    }
  }
  // tslint:disable-next-line:only-arrow-functions
  Vue.prototype.$ws.onclose = function () {
    if (cbMap && cbMap.onclose) {
      cbMap.onclose.bind(me)()
    }
  }
}

function wsParams (params: any) {
  const paramsArr = []
  for (const p in params) {
    if (params.hasOwnProperty(p)) {
      paramsArr.push(`${ p }=${ params[p] }`)
    }
  }
  return `?${ paramsArr.join('&') }`
}

export function createWebsocket (cbMap: any, username?: string) {
  // @ts-ignore
  const me = this
  const un = lg(KEY_WS_USERNAME)
  if (un) {
    createWs.bind(me)(un, cbMap)
  } else if (username) {
    createWs.bind(me)(username, cbMap)
  }
}
