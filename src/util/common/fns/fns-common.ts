import { Schema } from '@/components/common-form/form.model'
import { Column } from '@/components/common-table/table.model'

export function findItem (list: Schema[] | Column[], prop: string) {
  // @ts-ignore
  return list.find(item => item.prop === prop || item.filterProp === prop)
}

/**
 * @Description: 设置表格项或者表单项属性
 * @param list 要设置的集合
 * @param prop 要设置的那一列的prop值或者filterProp值（满足根据filterProp查找column的需求）
 * @param value 要设置的属性
 * @date 2019-07-06
 */
export function setProperty (list: Schema[] | Column[], prop: string, value: Schema | Column) {
  let listItem: any
  if (prop) {
    // @ts-ignore
    listItem = findItem(list, prop)
    if (listItem) {
      if (!value || typeof value !== 'object') {
        return
      }
      // 对于对象（非数组）是合并，对于其他则是覆盖，这里的合并只合并到props下的一级，再往下还是覆盖
      Object.keys(value).forEach(key => {
        // @ts-ignore
        const item = value[key]
        if (typeof item === 'object' && !Array.isArray(item)) {
          // 该值为一个对象且非数组，则应该扩展该值到listItem中
          listItem[key] = { ...(listItem[key] || {}), ...item }
        } else {
          listItem[key] = item
        }
      })
    }
  }
  return [ ...list ]
}

