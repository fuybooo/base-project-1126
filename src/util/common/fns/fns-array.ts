import { defaultFilterSplit } from '@/components/common-table/table.model'

/**
 * @Description: 操作数组的函数
 * @date 2019-06-27
 */
export interface DefaultListItem {
  id: string | number
  label: string | number
}

/**
 * 获取list中目标值
 * @param list 原list
 * @param value 根据value 获取
 * @param key 根据的value对应的key
 * @param destKey 目标key
 * @example 例如：已知 list = [{id: 1, name: '男'}, {id: 2, name: '女'}];
 * 现在要获取id为2时对应的name，可以使用该方法
 */
export function listDestValue (list: any[], value: any, key = 'id', destKey = 'label') {
  if (value === null || value === undefined) {
    return ''
  }
  if (typeof list === 'object' && Object.prototype.toString.call(list).toLowerCase().includes('array')) {
    const destValue = list.find(item => item[key] === value)
    if (destValue) {
      return destValue[destKey]
    }
  }
  return ''
}

export function changeToDefaultList (list: any[], idKey?: string, labelKey?: string): DefaultListItem[] {
  if (!list) {
    return []
  }
  if (!idKey || !labelKey) {
    return list
  }
  if (list.length) {
    if (list[0].id !== undefined && list[0].label !== undefined) {
      return list
    }
  }
  return list.map(item => ({
    id: item[idKey],
    label: item[labelKey],
  }))
}

export function changeListToFilters (list: any[], prop: string, idKey?: string, labelKey?: string) {
  return changeToDefaultList(list, idKey, labelKey).map((item: DefaultListItem) => ({
    text: item.label,
    value: item.id + defaultFilterSplit + prop,
  }))
}

/**
 * 将数组组合成新数组
 * 场景示例1：
 * 将 [['y', 'z'], ['a', 'b']]
 * 组合成
 * 长度为 2 * 2 的 数组
 * ['ya', 'yb', 'za', 'zb']
 * 场景示例2：
 * 将 [['x', 'y', 'z'], ['a', 'b'], ['1', '2']]
 * 组合成
 * 长度为 3 * 2 * 2 的 数组
 * ['xa1', 'xa2', 'xb1', 'xb2', 'ya1', 'ya2', 'yb1', 'yb2', 'za1', 'za2', 'zb1', 'zb2']
 * @param list
 */
export function composeList (list: string[][]): string[] {
  return list.reduce((p, c) => compose2Lists(p, c), [ '' ])
}

export function compose2Lists (list1: string[], list2: string[]): string[] {
  const result: string[] = []
  list1.forEach(item1 => {
    list2.forEach(item2 => {
      result.push(`${ item1 }${ item2 }`)
    })
  })
  return result
}

export function groupListToObjList (list: any[], groupedOptions: any = {
  key: 'subjectName',
  labelKey: 'name',
  flagKey: 'isSubject',
  uKey: 'id',
}): any {
  const result: any[] = []
  list.forEach((item, index) => {
    const existItem = result.find(res => res[groupedOptions.labelKey] === item[groupedOptions.key] && res[groupedOptions.flagKey])
    if (existItem) {
      result.push(item)
    } else {
      result.push({
        [groupedOptions.labelKey]: item[groupedOptions.key],
        [groupedOptions.flagKey]: true,
        [groupedOptions.uKey]: groupedOptions.flagKey + index,
      }, item)
    }
  })
  return result
}

/**
 * 对数组按照某个字段进行分组，并将该字段作为一条数据插入到新到list中
 * @param list
 * @param groupedOptions
 */
// export function groupListToList (list: any[], groupedOptions: any = {key: 'subjectName', labelKey: 'name', flagKey: 'isSubject', uKey: 'id'}): any[] {
//   const objList = groupListToObjList(list, groupedOptions.key)
//   let result: any[] = []
//   Object.keys(listObj).forEach((item, index) => {
//     result.push({
//       [groupedOptions.labelKey]: item,
//       [groupedOptions.flagKey]: true,
//       [groupedOptions.uKey]: groupedOptions.flagKey + index,
//     })
//     result = result.concat(listObj[item])
//   })
//   return result
// }
