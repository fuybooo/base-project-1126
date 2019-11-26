const webpackConfig = require('./webpack.config')
const vueConfig = require('./vue.matched.config')
// console.log(process.env, 'vue.config.js -- process.env')
// console.log(webpackConfig, 'vue.config.js -- webpackConfig')
module.exports = {
  assetsDir: './',
  configureWebpack: webpackConfig,
  devServer: {
    // 环境配置
    host: 'localhost',
    hotOnly: false,
    https: false,
    open: true, // 配置自动启动浏览器,
    port: 4201,
  },
  lintOnSave: true, // 是否在保存的时候检查
  publicPath: vueConfig['publicPath'],
  outputDir: vueConfig['outputDir'],
}
