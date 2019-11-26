/**
 * @Description: 基础而且通用的函数卸载此处
 * @date 2019-06-17
 */
import { FRAMEWORK_KEY_LIST } from '@/models/project/local-storage-keys/keys'

// 简化localStorage.getItem的写法
export function lg (key: string): string {
  return localStorage.getItem(key) || ''
}

// 从localStorage中获取对象
export function lgo (key: string): string {
  let res = ''
  try {
    res = JSON.parse(localStorage.getItem(key) || '')
  } catch (e) {
    res = ''
    // throw new Error(`从localStorage中取${key}的值时出现了错误`)
  }
  return res
}

// 简化localStorage.setItem的写法
export function ls (key: string, value: string): void {
  localStorage.setItem(key, value)
}

// 在localStorage中存对象
export function lso (key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value))
}

// 简化localStorage.removeItem的写法 不传值表示删除所有信息
export function lr (key?: string): void {
  if (key) {
    localStorage.removeItem(key)
  } else {
    // 除了 api 等框架信息，所有业务信息都删除
    Object.keys(localStorage).filter(k => !FRAMEWORK_KEY_LIST.includes(k)).forEach(k => localStorage.removeItem(k))
  }
}

/* 存取cookie */
export function sc (key: string, value: string, expMs: number = 3650 * 24 * 60 * 60 * 1000) {
  const expires = new Date()
  expires.setTime(expires.getTime() + expMs)
  document.cookie = `${ key }=${ escape(value) };expires=${ expires.toUTCString() };path=/;`
}

// 获取cookie
export function gc (key: string) {
  const reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)')
  const res = document.cookie.match(reg)
  return res ? unescape(res[2]) : null
}

// 删除cookie 传key 则删除指定cookie，不传，则清空cookie
export function dc (key?: string) {
  if (key) {
    sc(key, '', - 1)
  } else {
    const keys = document.cookie.match(/[^=;]+(?==)/g)
    if (keys) {
      Array.from(keys).forEach(k => sc(k, '', - 1))
    }
  }
}

// 生成uuid
export function guid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // tslint:disable-next-line:no-bitwise
    const r = Math.random() * 16 | 0
    // tslint:disable-next-line:no-bitwise
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

/**
 * 根据属性获取值
 * @example getProp.bind({a:{b:1}})('a.b') 即可得到该对象中a.b的值
 * @param prop
 */
export function getProp (prop: string): any {
  if (!prop) {
    return null
  }
  // @ts-ignore
  return prop.split('.').reduce((p, c) => (p && p[c] && typeof p[c] === 'string') ? p[c] : ((p && typeof p[c] !== 'undefined') ? p[c] : null), this)
}

// 根据属性set值
export function setProp (prop: string | undefined, value: any): void {
  if (!prop) {
    return
  }
  const path = prop.split('.')
  if (path.length > 1) {
    // @ts-ignore
    if (!this[path[0]]) {
      // @ts-ignore
      this[path[0]] = {}
    }
    // @ts-ignore
    let obj: any = this[path[0]]
    path.slice(1, path.length - 1).forEach(p => {
      obj = obj[p]
      if (!obj) {
        obj = {}
      }
    })
    obj[path[path.length - 1]] = value
  } else {
    // @ts-ignore
    this[path[0]] = value
  }
}

/**
 * @Description: 深度trim对象
 * @param obj 原对象
 * @param filterNone 是否删除 '' null undefined
 * @param onlyClone 是否为深拷贝，注意仅为深拷贝时，第二个参数需保证为false
 * @return 返回一个新的对象
 * @date 2019-06-27
 */
export function deepTrim (obj: any, filterNone = false, onlyClone = false) {
  let type = ''
  switch (typeof obj) {
    case 'object':
      if (Array.isArray(obj)) {
        type = 'array'
      } else if (obj) {
        if (obj instanceof Date || obj instanceof RegExp) {
          // 简单对象 如date regexp 等
          type = 'simple'
        } else {
          type = 'object'
        }
      }
      break
    case 'string':
      return onlyClone ? obj : obj.trim()
    default:
      return obj
  }
  const newObj: any = type === 'array' ? [] : (type === 'object' ? {} : obj)
  if (type === 'array' || type === 'object') {
    for (const i in obj) {
      if (obj.hasOwnProperty(i)) {
        const objValue = obj[i]
        if (filterNone) {
          if ((typeof objValue === 'string' && objValue.trim() === '') || objValue === null || objValue === undefined) {
            continue
          }
        }
        newObj[type === 'array' ? newObj.length : i] = deepTrim(objValue, filterNone, onlyClone)
      }
    }
  }
  return newObj
}

// 深克隆
export function deepClone (obj: any) {
  return deepTrim(obj, false, true)
}

export function isEmptyObject (obj: any) {
  if (typeof obj === 'object' && obj && !Array.isArray(obj)) {
    if (JSON.stringify(obj) === '{}') {
      return true
    }
  }
  return false
}

export function isEmpty (value: any) {
  if (value === null) {
    return true
  }
  if (Array.isArray(value)) {
    return !value.length
  }
  if (typeof value === 'object') {
    return isEmptyObject(value)
  }
  return value === '' || value === undefined
}

/**
 * 可取消的防抖函数
 * @param func 原函数
 * @param delay 延迟多久执行
 * @param immediate 是否立即执行
 * @return 返回一个新的可取消的防抖函数
 * @example const d = debounce(function () {}) 执行该函数 d() 取消执行 d.cancel()
 */
export function debounce (func: (...args: any) => any, delay = 100, immediate = false) {
  let timer: any = null
  const result = function (...args: any) {
    // @ts-ignore
    const ctx = this
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      const callNow = !timer
      timer = setTimeout(() => timer = null, delay)
      if (callNow) {
        func.apply(ctx, args)
      }
    } else {
      timer = setTimeout(() => func.apply(ctx, args), delay)
    }
  }
  result.cancel = () => clearTimeout(timer)
  return result
}

/**
 * 由于某些函数的执行依赖一些从异步函数中获取的值，若该值未被赋值，则函数执行时会出错，因此使用该函数可以解决此问题
 * @param conditionFn
 * @param fn
 */
export function executeUntil (conditionFn: () => boolean, fn: () => any) {
  const max = 500
  let count = 0
  
  function execute () {
    count ++
    if (conditionFn()) {
      clearInterval(timer)
      fn()
    } else if (count >= max) {
      clearInterval(timer)
    }
  }
  
  execute()
  const timer = setInterval(() => {
    execute()
  }, 10)
}

export function once (fn: () => void): () => void {
  let isFirst = true
  return () => {
    if (isFirst) {
      isFirst = false
      return fn
    }
  }
}

/*
  * 金额格式化函数
  * 参数说明：
  * number：要格式化的数字
  * decimals：保留几位小数
  * dec_point：小数点符号
  * thousands_sep：千分位符号
  * 调用示例
  * moneyFormat(29999.993) // "29,999.99"
  * */
export function moneyFormat (moneyNumber: string | number, decimals = 2, decPoint = '.', thousandsSep = ',') {
  const num = + (moneyNumber + '').replace(/[^0-9+-Ee.]/g, '')
  const toFixedFix = (n: number, p: number) => {
    const k = Math.pow(10, p)
    return '' + Math.round(n * k) / k
  }
  const s = (decimals ? toFixedFix(num, decimals) : '' + Math.round(num)).split('.')
  const reg = /(-?\d+)(\d{3})/
  while (reg.test(s[0])) {
    s[0] = s[0].replace(reg, '$1' + thousandsSep + '$2')
  }
  if ((s[1] || '').length < decimals) {
    s[1] = s[1] || ''
    s[1] += new Array(decimals - s[1].length + 1).join('0')
  }
  return s.join(decPoint)
}

/**
 * 将一个被格式化过的金额转化为数字
 * @param moneyString
 */
export function moneyToNumber (moneyString: string | number) {
  if (isNaN(+ moneyString)) {
    return parseFloat((moneyString + '').replace(/[^\d.-]/g, ''))
  } else {
    return moneyString
  }
}
