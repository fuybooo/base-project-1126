const pinyin = require('pinyin')
const list = require('../../public/data/area/area')
const max = Math.max(...list.map(item => item.name.length))
// console.log(JSON.stringify(max))

function composeList (list) {
  return list.reduce((p, c) => compose2Lists(p, c), [''])
}
function compose2Lists (list1, list2) {
  const result = []
  list1.forEach(item1 => {
    list2.forEach(item2 => {
      result.push(`${item1}${item2}`)
    })
  })
  return result
}
function getPy (label) {
  return {
    pinyinNormal: composeList(pinyin(label, {style: pinyin.STYLE_NORMAL, heteronym: false, segment: true})),
    pinyinFirstLetter: composeList(pinyin(label, {style: pinyin.STYLE_FIRST_LETTER, heteronym: false, segment: true})),
  }
}
const areaList = require('../../public/data/area/area-code')
const res = areaList.map(item => {
  const city = item.city
  delete item.city
  return {
    value: item.code,
    label: item.name,
    ...(city ? {children: city} : {}),
  }
})
const r = res.map(item => {
  return {
    ...item,
    ...getPy(item.label),
    ...(item.children ? {children: item.children.map(c => {
        const ch = c.area
        delete c.area
        return {
          value: c.code,
          label: c.name,
          ...getPy(c.name),
          ...(ch ? {children: ch.map(chItem => {
            return {
              value: chItem.code,
              label: chItem.name,
              ...getPy(chItem.name),
            }
            })} : {}),
        }
      })} : {})
  }
})
console.log(JSON.stringify(r))
