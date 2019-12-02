<template>
  <div class="demo-page">
    <h2>上传文件 demo</h2>
    <h3>1. 常规用法</h3>
    <div class="demo-box">
      <div class="demo-line">
        <p>使用场景：直接上传文件</p>
        <div class="demo-value">{{ fileId }}</div>
        <base-upload :props="uploadProps">
          <el-button type="text">{{ text }}</el-button>
        </base-upload>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({})
  export default class VueCropperDemo extends Vue {
    public fileId = ''
    public filePath = ''
    public uploadProps = {}

    public created () {
      const me: any = this
      this.uploadProps = {
        'on-success' (res: any) {
          me.fileId = res.data.id
          me.filePath = me.$config.baseURL + '/' + res.data.path
        },
        'on-change' (file: any, fileList: any[]) {
          // 文件改变时，让文件列表只存在最后一次上传的文件
          me.uploadProps['file-list'] = fileList.slice(- 1)
        },
        'on-progress' (event: any) {
          console.log(event, '上传时的狗子')
        },
        'file-list': [],
      }
    }

    // 这里展示里如何控制slot的内容
    public get text () {
      return this.fileId ? '重新上传' : '上传文件'
    }
  }
</script>
<style lang="less" scoped>
  .h200 {
    height: 200px;
  }
</style>
