/**
 * @Description: 通用的数据写在此处
 * @date 2019-06-17
 */
// 语言
export const langList = [
  {
    label: '简体中文',
    value: 'cn',
  },
  {
    label: 'English',
    value: 'en',
  },
]
// 模式
export declare type Pattern = 'create' | 'view' | 'edit' | ''

// 返回结果的结构
export interface HttpRes {
  code: string | number
  head: {
    errCode: number,
  }
  msg: string
  data: any | {
    results: any[],
    total?: number,
  }
}

export const UUID_KEY = '_uuid'
