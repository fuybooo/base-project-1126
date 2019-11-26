export interface Menu {
  index?: string
  title?: string
  hidden?: boolean // 不在菜单中显示
  icon?: string
  parentName?: string,
  children?: Menu[]
}
