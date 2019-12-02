import { Vue } from 'vue/types/vue'
import { urlType } from '@/util/project/urls/url-util'
import { AxiosInstance } from 'axios'
import { Urls } from '@/util/project/urls/urls'
import { HttpRes } from '@/models/common/models'
import GlobalEvent from '@/util/project/models/global-event'
import { User } from '@/models/project/user/user'

interface VueEvent {
  // tslint:disable-next-line:ban-types
  $on (event: string | string[], callback: Function): this
  
  $emit (event: string, ...args: any[]): this
}

interface Config {
  baseURL: string
  uploadUrl: string
}

declare module 'vue/types/vue' {
  // 需要扩展的属性
  
  interface Vue {
    // 自定义vue实例属性
    readonly $urls: Urls
    readonly $req: (url: urlType, data?: any, useCache?: boolean, method?: string, axiosInstance?: AxiosInstance) => Promise<any>
    // 自定义提示方法
    readonly $error: (message?: string, title?: string) => void
    readonly $success: (message?: string, title?: string) => void
    readonly $tip: (res: HttpRes) => void
    readonly $globalEvent: VueEvent
    readonly $event: GlobalEvent
    readonly $ws: WebSocket
    readonly $getUser: () => User
    readonly $config: Config
  }
}

declare global {
  interface Window {
    _vueInstance_: Vue
    _projectPrefix_: string
  }
}
