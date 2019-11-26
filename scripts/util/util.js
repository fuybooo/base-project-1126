const fs = require('fs')
const path = require('path')
const getTime = require('../../shared/fns').getTime
const rootPath = path.resolve(__dirname, '../..')

function upperCaseFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function lowerCaseFirst(str) {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

// 得到大驼峰名称
function getCamelName(str) {
  return str.split('-').map(item => upperCaseFirst(item)).join('')
}

// 得到小驼峰名称
function getSmallCamelName(str) {
  return lowerCaseFirst(getCamelName(str))
}

// 得到中划线名称
function getLineName(str) {
  return getSmallCamelName(str).split('').map(item => item === item.toUpperCase() ? `-${ item.toLowerCase() }` : item).join('')
}

function getClassName(mn, itemName) {
  return `${ upperCaseFirst(getCamelName(mn)) }${ upperCaseFirst(getCamelName(itemName)) }`
}

function createDir(...paths) {
  const dirPath = path.resolve(rootPath, ...paths)
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
  }
}

function createFile(moduleConfig, content, ...paths) {
  const filePath = path.resolve(rootPath, ...paths)
  // 为了安全起见，这里如果文件存在，则不做处理
  if (moduleConfig.test || !fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content)
  }
}

module.exports = {
  upperCaseFirst,
  getTime,
  getCamelName,
  getSmallCamelName,
  getLineName,
  getClassName,
  createDir,
  createFile,
}
