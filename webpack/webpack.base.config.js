const path = require('path')
const date = new Date()
process.env.VUE_APP_VERSION = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

function resolve(pathStr) {
  return path.resolve(__dirname, '..', pathStr)
}

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src'),
      '@shared': resolve('shared'),
    },
  },
}
