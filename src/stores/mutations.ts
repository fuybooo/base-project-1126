import { State } from '@/stores/states'
import { Menu } from '@/components/common-menu/menu.model'
import { dic, getUser, setMenuFlag, setMenus, toggleLangSetting } from '@/stores/mutation-types'

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
}
