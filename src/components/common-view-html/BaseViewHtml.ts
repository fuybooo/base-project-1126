import Vue from 'vue'
import './BaseViewHtml.less'
import { isEmpty } from '@/util/common/fns/fns'

Vue.component('BaseViewHtml', {
  render (createElement) {
    return createElement('span', {
      class: getHtmlClass.bind(this)(),
    }, [ getHtmlValue.bind(this)() ])
  },
  props: {
    value: [ Array, Object, String, Number, Boolean ],
    formItem: {
      type: Object,
      default () {
        return {}
      },
    },
  },
})

function getHtmlValue () {
  // @ts-ignore
  const me = this
  if (!isEmpty(me.formItem.viewValue)) {
    return me.formItem.viewValue
  } else {
    if (isEmpty(me.value)) {
      return me.formItem.viewDefaultValue === undefined ? '--' : me.formItem.viewDefaultValue
    } else {
      if (me.formItem.viewFilter) {
        return me.formItem.viewFilter(me.value)
      } else {
        return me.value
      }
    }
  }
}

function getHtmlClass () {
  // @ts-ignore
  const me = this
  const className = 'base-view-html'
  if (me.formItem.viewClassName) {
    return `${ className } ${ me.formItem.viewClassName }`
  } else {
    if (isEmpty(me.formItem.viewValue) && isEmpty(me.value)) {
      return `${ className } base-view-none`
    } else {
      return className
    }
  }
}
