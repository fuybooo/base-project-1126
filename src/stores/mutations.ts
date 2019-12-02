import { State } from '@/stores/states'
import { Menu } from '@/components/common-menu/menu.model'
import { dic, getUser, setCache, setMenuFlag, setMenus, toggleLangSetting } from '@/stores/mutation-types'
import { HttpRes } from '@/models/common/models'

export default {
  [toggleLangSetting] (state: State, setting: boolean) {
    state.showLangSetting = setting
  },
  [setMenus] (state: State, menus: Menu[]) {
    state.menus = menus
  },
  [setMenuFlag] (state: State, menuFlag: string) {
    state.menuFlag = menuFlag
  },
  [dic] (state: State, dicObj: any) {
    // @ts-ignore
    state.dic[dicObj.dicType] = dicObj.list
  },
  [getUser] (state: State, user: any) {
    state.user = user
  },
  // 当需要清除缓存时，需要调用清除缓存的方法
  [setCache] (state: State, cacheData: { url: string, params: any, result: HttpRes }) {
    const cacheObj = state.cache[cacheData.url]
    if (cacheObj) {
      cacheObj.params = cacheData.params
      cacheObj.result = cacheData.result
    } else {
      state.cache[cacheData.url] = {
        params: cacheData.params,
        result: cacheData.result,
      }
    }
  },
}
