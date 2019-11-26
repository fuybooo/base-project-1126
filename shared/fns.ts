export const p0 = (num: number | string) => (num + '').padStart(2, '0')

/**
 * 将前后端公用的方法放在此处
 */
export function getTime(type = 'yyyy-MM-dd HH:mm:ss', dateInstance?: Date) {
  dateInstance = dateInstance || new Date()
  let date
  const y = dateInstance.getFullYear()
  const M = p0(dateInstance.getMonth() + 1)
  const d = p0(dateInstance.getDate())
  const H = p0(dateInstance.getHours())
  const m = p0(dateInstance.getMinutes())
  const s = p0(dateInstance.getSeconds())
  if (type === 'yyyy-MM-dd HH:mm:ss') {
    date = `${ y }-${ M }-${ d } ${ H }:${ m }:${ s }`
  } else if (type === 'yyyy-MM') {
    date = `${ y }-${ M }`
  }
  return date
}

/* 生成 uuid */
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // tslint:disable-next-line:no-bitwise
    const r = Math.random() * 16 | 0
    // tslint:disable-next-line:no-bitwise
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

export const g = guid

/* 将查询参数转化为对象 */
export function getUrlParams(search: string) {
  if (search.startsWith('?')) {
    return search.slice(1).split('&').map(item => ({ [item.split('=')[0]]: item.split('=')[1] })).reduce((p, c) => ({ ...p, ...c }), {})
  } else {
    throw new Error('参数不正确')
  }
}

// 获取文字的长度，中文算1位，英文算0.5位，取上限（4.5即取5）
export function getCalcLength(str: string) {
  let len = 0
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < str.length; i ++) {
    const item = str[i]
    if (/[a-zA-Z0-9_]/.test(item)) {
      len += 0.5
    } else {
      len += 1
    }
  }
  return len
}
