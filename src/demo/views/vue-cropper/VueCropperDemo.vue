<template>
  <el-container class="h">
    <el-main>
      <h3>使用二次封装的插件进行上传</h3>
      <base-cropper @change="logImg" v-model="img"></base-cropper>
      <hr>
      <h3>使用slot</h3>
      <base-cropper @change="logImg2" ref="baseCropper" v-model="img2">
        <el-button @click="upload">上传</el-button>
      </base-cropper>
    </el-main>
  </el-container>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({})
  export default class VueCropperDemo extends Vue {
    public img = ''
    public img2 = ''

    public logImg () {
      console.log(this.img)
    }

    public logImg2 () {
      console.log(this.img2)
    }

    public upload () {
      (this.$refs.baseCropper as any).handleSelectFile()
    }
  }
</script>
<style lang="less" scoped>
  .h200 {
    height: 200px;
  }
</style>
