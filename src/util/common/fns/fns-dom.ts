/**
 * @Description: 通用的DOM函数写在此处
 * @date 2019-06-17
 */
/**
 * 给元素添加类
 * @param el
 * @param className
 */
export function addClassName (el: Element, className: string): void {
  if (el) {
    const classList = Array.from(el.classList)
    if (!classList.includes(className)) {
      el.className = [ ...classList, className ].join(' ')
    }
  }
}

/**
 * 给元素删除类
 * @param el
 * @param className
 */
export function removeClassName (el: Element, className: string): void {
  if (el) {
    const classList = Array.from(el.classList)
    if (classList.includes(className)) {
      el.className = classList.filter(item => item === className).join(' ')
    }
  }
}

/**
 * 切换元素的类
 * @param el
 * @param className
 */
export function toggleClassName (el: Element, className: string): void {
  if (el) {
    const classList = Array.from(el.classList)
    if (classList.includes(className)) {
      el.className = classList.filter(item => item !== className).join(' ')
    } else {
      el.className = [ ...classList, className ].join(' ')
    }
  }
}

/* 获取元素的指定属性值 */
export function getStyle (selector: string, attr: string, isNumber = true) {
  const el = document.querySelector(selector)
  if (el) {
    if (isNumber) {
      // @ts-ignore
      return Number.parseFloat(window.getComputedStyle(el)[attr]) || 0
    } else {
      // @ts-ignore
      return window.getComputedStyle(el)[attr]
    }
  }
  return 0
}

/* 根据选择器获取元素所占高度 */
export function getClientHeight (selector: string) {
  const el = document.querySelector(selector)
  if (el) {
    return el.clientHeight +
      getStyle(selector, 'margin-top') +
      getStyle(selector, 'margin-bottom')
  }
  return 0
}

/* 获取元素在垂直方向的padding 和margin 之和 */
export function getSpaceHeight (selector: string) {
  return getStyle(selector, 'padding-top') +
    getStyle(selector, 'padding-bottom') +
    getStyle(selector, 'margin-top') +
    getStyle(selector, 'margin-bottom')
}

/* 获取滚动条高度 */
export function getScrollTop () {
  let scrollTop = 0
  if (document.documentElement) {
    scrollTop = document.documentElement.scrollTop
  } else if (document.body) {
    scrollTop = document.body.scrollTop
  }
  return scrollTop
}

/**
 * 将base64转换为文件格式
 * @param urlData
 */
export function convertBase64UrlToFile (urlData: string) {
  const data: string[] = urlData.split(',')
  // @ts-ignore
  const mime = data[0].match(/:(.*?);/)[1]
  const bytes = window.atob(data[1])
  const l = bytes.length
  const u8arr = new Uint8Array(bytes.length)
  for (let i = 0; i < l; i ++) {
    u8arr[i] = bytes.charCodeAt(i)
  }
  // const blob = new Blob([u8arr], {type: mime})
  // blob.lastModifiedDate = new Date()
  // blob.name = 'file'
  return new File([ u8arr ], `file.${ mime.split('/')[1] }`, { type: mime })
}
