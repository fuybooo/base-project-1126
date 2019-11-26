// 让ts识别所有以.vue结尾的资源
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

