import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {
    }
    
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {
    }
    
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

declare module 'vue/types/options' {
  // 声明可以在tsx组件上传入任意属性，并且，对于需要提示的属性可以单独声明
  interface ComponentOptions<V extends Vue> {
    [propName: string]: any // 任意属性都支持
    ref?: string // ref属性会有提示
  }
}
