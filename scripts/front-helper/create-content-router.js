const util = require('../util/util')

function getContent(moduleConfig) {
  const mn = util.getLineName(moduleConfig.module.name)
  const mt = moduleConfig.module.title
  const importInfo = moduleConfig.pages.map(item => (
    `const ${ util.getClassName(mn, util.getLineName(item.name)) } = () => import(/* webpackChunkName: "${ mn }" */ '@/modules/${ mn }/views/${ mn }-${ util.getLineName(item.name) }/${ util.getClassName(mn, util.getLineName(item.name)) }.vue')` +
    (item.dialogDetail ? '' : `
const ${ util.getClassName(mn, util.getLineName(item.name)) }Detail = () => import(/* webpackChunkName: "${ mn }" */ '@/modules/${ mn }/views/${ mn }-${ util.getLineName(item.name) }/${ util.getClassName(mn, util.getLineName(item.name)) }Detail.vue')
`))).join('')
  const childrenInfo = moduleConfig.pages.map(item => (`{
      path: '${ mn }-${ util.getLineName(item.name) }',
      name: '${ mn }-${ util.getLineName(item.name) }',
      component: ${ util.getClassName(mn, util.getLineName(item.name)) },
      meta: {
        title: '${ item.title }',
      },
    },` + (item.dialogDetail ? '' : `
    {
      path: '${ mn }-${ util.getLineName(item.name) }-detail/:pattern/:id?',
      name: '${ mn }-${ util.getLineName(item.name) }-detail',
      component: ${ util.getClassName(mn, util.getLineName(item.name)) }Detail,
      meta: {
        title: '${ item.title }详情',
        parentName: '${ mn }-${ util.getLineName(item.name) }',
      },
    },`))).join('\n')
  return (
    `import {ProRouteConfig} from '@/model/project/route/route.model'
const ${ util.getCamelName(mn) } = () => import(/* webpackChunkName: "${ mn }" */ '@/modules/${ mn }/views/${ util.getCamelName(mn) }.vue')
${ importInfo }
const router: ProRouteConfig = {
  path: '${ mn }',
  name: '${ mn }',
  component: ${ util.getCamelName(mn) },
  children: [
    ${ childrenInfo }
  ],
  meta: {
    title: '${ mt }',
  },
}
export default router
`)
}

module.exports = getContent
