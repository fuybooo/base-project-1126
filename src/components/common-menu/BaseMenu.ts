import Vue from 'vue'
import { Menu } from '@/components/common-menu/menu.model'
import './BaseMenu.less'

// @ts-ignore
export default Vue.component('baseMenuComponent', {
  functional: true, // 使用函数式组件可以解决返回多个子元素的问题
  render (createElement, { props }) { // 使用函数式组件时只能在第二个参数中去取menus而不能在this中取
    const max = 1100
    let menus = props.menus as Menu[]
    if (menus.length > max) {
      menus = menus.slice(0, max).concat([ {
        index: (props.parent ? (props.parent.idnex + '-') : '') + 'more',
        title: '更多',
        children: menus.slice(max),
      } ])
    }
    return menus.filter((menu: Menu) => !menu.hidden).map((menu: Menu) => {
      if (menu.children) {
        return createElement('el-submenu', {
          props: {
            index: menu.index,
          },
        }, [
          createElement('template', { slot: 'title', class: `menu-first` }, [
            createElement('i', { class: `${ menu.icon || '' } menu-icon` }),
            createElement('span', { class: `nav-text nav-text-f` }, menu.title),
          ]),
          createElement('base-menu', { props: { menus: menu.children, parent: menu }, class: `menu-first` }),
        ])
      } else {
        return createElement('el-menu-item', { props: { index: menu.index }, class: `menu-first` },
          [
            createElement('i', { class: `${ menu.icon || '' } menu-icon` }),
            createElement('span', { class: `nav-text nav-text-f` }, menu.title),
          ])
      }
    })
  },
  props: {
    menus: {
      type: Array,
      required: true,
    },
    parent: {
      type: Object,
    },
  },
})
