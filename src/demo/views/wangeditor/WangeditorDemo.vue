<template>
  <div class="demo-page">
    <h2>富文本编辑器 demo</h2>
    <h3>1. 常规用法</h3>
    <div class="demo-box">
      <div class="demo-line">
        <p>使用场景：使用原生 wangeditor </p>
        <div ref="info"></div>
        <div class="mt20"></div>
        <el-button @click="getContent">查看内容</el-button>
        <el-button @click="setContent">设置内容</el-button>
        <el-button @click="appendContent">追加内容</el-button>
        <el-button @click="clearContent">清空内容</el-button>
        <el-button @click="switchDisabled">切换禁用</el-button>
      </div>
    </div>
    <div class="h1000"></div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  const E = require('wangeditor')

  @Component({})
  export default class WangeditorDemo extends Vue {
    public editorContent = ''
    public editor: any
    public editorDisabled = false

    public created () {
      this.$nextTick(() => {
        this.editor = new E(this.$refs.info)
        this.editor.customConfig.uploadImgShowBase64 = true
        this.editor.create()
      })
    }

    public getContent () {
      this.editorContent = this.editor.txt.html()
      console.log(this.editorContent)
    }

    public setContent () {
      this.editor.txt.html(`<p>设置的内容</p>`)
    }

    public appendContent () {
      this.editor.txt.append(`<p>追加的内容</p>`)
    }

    public clearContent () {
      this.editor.txt.clear()
    }

    public switchDisabled () {
      this.editorDisabled = !this.editorDisabled
      this.editor.$textElem.attr('contenteditable', !this.editorDisabled)
    }
  }
</script>
<style lang="less" scoped>
  .h1000 {
    height: 1000px;
  }
</style>
