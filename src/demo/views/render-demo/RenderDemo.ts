import Vue from 'vue'

Vue.component('RenderDemo', {
  render (createElement: typeof Vue.prototype.$CreateElement) {
    // console.log('render')
    return createElement('el-input', { props: this.props })
  },
  props: {
    props: {
      type: Object,
    },
  },
})
