const devConfig = require('./vue.dev.config')
const prodConfig = require('./vue.prod.config')
// 打包时输入的参数 todo 判断其合法性
const BUILD_MODE = process.env.mode || 'dev'

function getConfig() {
  let config
  switch (BUILD_MODE) {
    case 'dev':
      config = devConfig
      break
    case 'node':
    case 'prod':
      config = prodConfig
      break
    default:
      config = devConfig
      break
  }
  return config
}

module.exports = getConfig()
