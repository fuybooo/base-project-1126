<template>
  <div class="base-cropper">
    <div class="result-box" v-if="cropperResult && showResult">
      <img :src="cropperResult" :width="localResultProp.style.width" alt="">
      <i :style="{left: localResultProp.style.width}" @click="delImg" class="el-icon-close"
         v-if="pattern !== 'view'"></i>
    </div>
    <slot v-else>
      <el-button @click="handleSelectFile">上传</el-button>
    </slot>
    <input @change="changeFile" hidden ref="fileInput" type="file">
    <base-dialog :props="localCropperDialogProp" :visible.sync="cropperVisible" @ok="cropperDone">
      <vueCropper
        :autoCrop="localOption.autoCrop"
        :class="[localCropperClass]"
        :fixed="localOption.fixed"
        :img="localOption.img"
        class="h-300"
        ref="cropper"
      ></vueCropper>
    </base-dialog>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import './BaseCropper.less'

  const VueCropper = require('vue-cropper').VueCropper

  @Component({ components: { VueCropper } })
  export default class BaseCropper extends Vue {
    @Prop({ default: 1, type: Number }) public uploadType!: number
    @Prop() public option!: any
    @Prop() public cropperDialogProp!: any
    @Prop({ default: '', type: String }) public cropperClass!: string
    @Prop({ default () { return {} } }) public resultProp!: any
    @Prop() public value!: any
    @Prop({ default: 'edit' }) public pattern!: string
    @Prop({ default: false, type: Boolean }) public showResult!: boolean
    public cropperResult = ''
    public defaultOption = {
      autoCrop: true,
      fixedBox: true,
      fixed: true, // 固定比例 默认1：1
      centerBox: true, // 截图框是否被限制在图片里面
      outputSize: 1,
    }
    public cropperVisible = false

    @Watch('value', { immediate: true })
    public onValueChange (val: any) {
      this.cropperResult = val
    }

    public get localOption () {
      return {
        ...this.defaultOption,
        ...this.option,
      }
    }

    public get localCropperDialogProp () {
      const title = '上传照片'
      const width = '932px'
      if (this.uploadType === 1) {
      }
      return {
        title,
        width,
        ...this.cropperDialogProp,
      }
    }

    public get localCropperClass () {
      return `${ this.cropperClass } base-cropper-wrap-${ this.uploadType }`
    }

    public get localResultProp () {
      return {
        style: {
          width: '256px',
        },
        ...this.resultProp,
      }
    }

    public handleSelectFile () {
      (this.$refs.fileInput as any).click()
    }

    public changeFile () {
      const file = (this.$refs.fileInput as any).files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      const me = this
      reader.onloadend = (e: any) => {
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          me.localOption.img = window.URL.createObjectURL(new Blob([ e.target.result ]))
        } else {
          me.localOption.img = e.target.result
        }
        me.cropperVisible = true
      }
    }

    public cropperDone () {
      (this.$refs.cropper as any).getCropData((data: any) => {
        this.cropperResult = data
        this.$emit('done', data)
        this.$emit('input', data)
        this.$emit('change', data)
        this.cropperVisible = false
      })
    }

    public delImg () {
      (this.$refs.fileInput as any).value = ''
      this.cropperResult = ''
      this.$emit('del')
      this.$emit('input', '')
      this.$emit('change', '')
    }
  }
</script>
<style lang="less" scoped>

</style>
