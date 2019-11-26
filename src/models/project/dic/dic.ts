export interface DicItem {
  typeCode: string
  typeName: string
  code: string
  name: string
  parentCode: string
}

export interface DicType {
  SYS_USER_TYPE?: DicItem[]
}

export const DIC = {
  SYS_USER_TYPE: 'SYS_USER_TYPE', // 用户类型
}
