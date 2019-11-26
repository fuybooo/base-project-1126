const devConfig = require('./webpack.dev.config')
const prodConfig = require('./webpack.prod.config')
// const entry = process.env.entry
// console.log('entry', entry)

function getConfig() {
  return process.env.NODE_ENV === 'production' ? getDevConfig() : getProdConfig()
}

function getDevConfig() {
  return devConfig
}

function getProdConfig() {
  return prodConfig
}

module.exports = getConfig()
