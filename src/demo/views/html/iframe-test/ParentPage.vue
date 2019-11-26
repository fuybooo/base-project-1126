<template>
  <div class="h">
    <el-button @click="handleClick">发送事件</el-button>
    <hr>
    <iframe frameborder="0" height="200px" id="iframe" name="iframe" ref="iframe"
            src="http://localhost:8000/iframe.html"
            width="100%"></iframe>
    <!--    <iframe src="" frameborder="0"></iframe>-->
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({})
  export default class ParentPage extends Vue {
    public created () {
      window.addEventListener('message', (event) => {
        // console.log('parent:', event)
      }, false)
    }

    public handleClick = () => {
      (this.$refs.iframe as any).contentWindow.postMessage({
        name: 'postMessage parent name',
        type: 'postMessage parent type',
        from: 'postMessage parent from',
      }, 'http://localhost:8000')
    }
  }
</script>
<style lang="less" scoped>

</style>
