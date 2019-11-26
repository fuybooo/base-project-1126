/**
 * @Description: 通过程序创建大量的module，然后进行打包
 * @date 2019-07-29
 */
const fs = require('fs')
const path = require('path')
const config = require('./create-config-exmple')
const configPath = path.resolve(__dirname, './', 'create-config.json')
const getConfigContent = function (i) {
  const b = i % 26
  const t = Math.floor(i / 26 % 26)
  const h = Math.floor(i / 26 / 26)
  const suffix = String.fromCodePoint(97 + h) + String.fromCodePoint(97 + t) + String.fromCodePoint(97 + b)
  console.log(suffix)
  return JSON.stringify({
    module: {
      ...config.module,
      name: config.module.name + suffix,
    },
    pages: config.pages.map(item => {
      return {
        ...item,
        name: item.name + suffix,
      }
    }),
  })
}
const max = 50
const configData = `[${ Array(max).fill(0).map((_i, i) => getConfigContent(i)).join() }]`

fs.writeFileSync(configPath, configData)
