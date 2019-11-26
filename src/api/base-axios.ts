import Vue from 'vue'
import axios, { AxiosInstance } from 'axios'
import config from '@/config/base-config'
import { IUrl, staticPath, urlType } from '@/util/project/urls/url-util'
import { dc, deepTrim, gc, lg } from '@/util/common/fns/fns'
import { debugReq } from '@/config/dev-config'
import { KEY_CAMPUS_ID, KEY_OPEN_STATIC, KEY_STATIC_INCLUDE, KEY_TOKEN } from '@/models/project/local-storage-keys/keys'
import { isDev, isProd } from '@shared/env'
// 原始axios
axios.interceptors.request.use((req) => {
  // 请求稳定之后将其删除 start
  console.log('测试请求', req.url, JSON.stringify({
    data: { ...req.data, ...req.params, campusId: lg(KEY_CAMPUS_ID) },
    reqtype: '10',
    token: gc(KEY_TOKEN),
  }), {
    data: { ...req.data, ...req.params, campusId: lg(KEY_CAMPUS_ID) },
    reqtype: '10',
    token: gc(KEY_TOKEN),
  })
  // 请求稳定之后将其删除 end
  return req
})
axios.interceptors.response.use((res) => {
  return res.data
})

function create (options?: any): AxiosInstance {
  const localAxios = axios.create({
    ...(options || {}),
    baseURL: config.baseURL,
    withCredentials: true,
  })
  localAxios.interceptors.request.use((req) => {
    // 添加处理入参的代码
    // 针对不同的接口使用不同的环境
    if (isDev()) {
      debugReq(req)
    }
    // 请求稳定之后将其删除 start
    console.log('测试请求', req.url, JSON.stringify({
      data: { ...req.data, ...req.params, campusId: lg(KEY_CAMPUS_ID) },
      reqtype: '10',
      token: gc(KEY_TOKEN),
    }), {
      data: { ...req.data, ...req.params, campusId: lg(KEY_CAMPUS_ID) },
      reqtype: '10',
      token: gc(KEY_TOKEN),
    })
    // 请求稳定之后将其删除 end
    const campusId = lg(KEY_CAMPUS_ID)
    // 每个请求都会带上校区id
    req.data = {
      data: {
        ...req.data,
        ...(campusId ? { campusId } : {}),
      },
      reqtype: '10',
      token: gc(KEY_TOKEN),
    }
    return req
  })
  localAxios.interceptors.response.use((res) => {
    // 通过某个条件判断哪些接口需要提示，哪些接口不需要提示，这样可以统一处理提示问题
    if (res.data.msg) {
      Vue.prototype.$tip(res.data)
    }
    // 若后端返回未登录的错误，则跳转到登录界面
    if (res.data.code === 40011) {
      if (isProd()) {
        // 正式环境跳转到登录界面
        dc(KEY_TOKEN)
        window._vueInstance_.$router.push({ name: 'login' })
      }
    }
    return res.data
  })
  return localAxios
}

const getSafeUrl = (url: string): string => {
  return url.endsWith('/') ? url : url + '/'
}
const getUrl = (url: urlType): IUrl => {
  let urlConfig: IUrl
  if (typeof url === 'string') {
    urlConfig = { url: getSafeUrl(url), isStatic: false }
  } else if (url.isStatic) {
    urlConfig = {
      url: (url.staticPath || staticPath) + (url.prefix || '') + url.url + '.json',
      isStatic: true,
      isCommon: url.isCommon,
    }
  } else {
    urlConfig = { url: getSafeUrl((url.prefix || '') + url.url), isStatic: false }
  }
  return urlConfig
}
const getAxiosRes = (url: urlType, params: any, fn: () => any) => {
  const urlConfig = getUrl(url)
  const axiosResFn = () => {
    if (urlConfig.isStatic) {
      let staticUrl = urlConfig.url
      const successUrl = staticPath + 'result/success.json'
      const errorUrl = staticPath + 'result/error.json'
      if (urlConfig.isCommon) {
        staticUrl = successUrl
      }
      return axios.get(staticUrl, {
        params: {
          ...params.params, url: urlConfig.url,
        },
      })
    } else {
      return fn()
    }
  }
  // 强制开启所有静态数据
  if (config.openStatic) {
    return axiosResFn()
  }
  // 在没有设置 localStorage 时，开发环境开启静态数据 生产环境关闭静态数据
  // 若想在生产环境使用静态数据，或者想在开发环境使用后台数据 则可以通过设置 localStorage 达到目的
  if (config.closeStatic) {
    // 强制开启静态数据
    if (lg(KEY_OPEN_STATIC) === '1') {
      return axiosResFn()
    } else if (lg(KEY_STATIC_INCLUDE)) {
      // 在关闭静态数据，且没有强制开启所有静态数据d情况下，判断是否有强制开启部分静态数据的配置
      try {
        const includeList = JSON.parse(lg(KEY_STATIC_INCLUDE))
        if (Array.isArray(includeList)) {
          if (includeList.some(item => urlConfig.isStatic && urlConfig.url.startsWith(staticPath + item))) {
            return axiosResFn()
          }
        } else {
          throw new Error()
        }
      } catch (e) {
        throw new Error(`KEY_STATIC_INCLUDE 应该配置为数组：localStorage.setItem('LF_FE_STATIC_INCLUDE', '["campus/", "staff/"]')`)
      }
    }
  } else {
    // 判断是否需要强制关闭静态数据
    if (lg(KEY_OPEN_STATIC) !== '0') {
      return axiosResFn()
    }
  }
  return fn()
}
const methods: any = {
  get (url: urlType, params = {}, axiosInstance: AxiosInstance): any {
    return getAxiosRes(url, { params }, () => axiosInstance.get(getUrl(url).url, { params }))
  },
  post (url: urlType, data = {}, axiosInstance: AxiosInstance): any {
    return getAxiosRes(url, { params: data }, () => axiosInstance.post(getUrl(url).url, data))
  },
  put (url: urlType, data = {}, axiosInstance: AxiosInstance): any {
    return getAxiosRes(url, { params: data }, () => axiosInstance.put(getUrl(url).url, data))
  },
  delete (url: urlType, data = {}, axiosInstance: AxiosInstance): any {
    return getAxiosRes(url, { params: data }, () => axiosInstance.delete(getUrl(url).url, data))
  },
}
const defAxios = create()
const request = (url: urlType, data = {}, method = 'post', axiosInstance = defAxios) => {
  return methods[method](url, deepTrim(data, true), axiosInstance)
}
export default {
  request,
  create,
}
// 在vue原型上挂载常用函数
Vue.prototype.$req = request
