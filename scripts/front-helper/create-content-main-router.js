const fs = require('fs')
const path = require('path')
const util = require('../util/util')
const config = require('./create-config')

function getContent() {
  let importStr = ''
  let nameStr = ''
  config.forEach(item => {
    const mn = util.getSmallCamelName(item.module.name)
    const mnFile = util.getLineName(item.module.name)
    importStr += `import ${ mn }Router from '@/modules/${ mnFile }/router/router'
`
    nameStr += `    ${ mn }Router,
`
  })
  return (
    `import {ProRouteConfig} from '@/model/project/route/route.model'
import Main from '@/modules/main/Main.vue'
import MainHome from '@/modules/main/MainHome.vue'
import demoRouter from '@/demo/router/router'
import systemRouter from '@/modules/system/router/router'
${ importStr }

export const mainRoute: ProRouteConfig = {
  path: '/main',
  name: 'main',
  redirect: {name: 'home'},
  component: Main,
  children: [
    {
      path: '',
      name: 'home',
      component: MainHome,
      meta: {
        title: 'Home',
        hideBread: true,
      },
    },
    demoRouter,
    systemRouter,
${ nameStr }
  ],
  meta: {
    title: 'main',
  },
}
`)
}

const configPath = path.resolve(__dirname, '../../src/router/main.router.ts')
fs.writeFileSync(configPath, getContent())
