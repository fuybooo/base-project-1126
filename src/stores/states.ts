import { Menu } from '@/components/common-menu/menu.model'
import { DicType } from '@/models/project/dic/dic'
import { User } from '@/models/project/user/user'

export interface State {
  showLangSetting: boolean
  menus: Menu[]
  menuFlag: string
  dic: DicType
  user: User
  cache: any
}

const state: State = {
  showLangSetting: true, // 是否显示语言选择器
  menus: [],
  menuFlag: '',
  dic: {},
  user: {},
  cache: {},
}
export default state
