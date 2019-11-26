<template>
  <el-upload
    class="base-upload"
    ref="upload"
    v-bind="localProps">
    <template>
      <slot>
        <el-button size="small" type="primary">点击上传</el-button>
      </slot>
    </template>
    <template slot="tip">
      <slot name="tip">
        <div class="el-upload__tip">{{tipText}}</div>
      </slot>
    </template>
  </el-upload>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import './BaseUpload.less'
  import { gc } from '@/util/common/fns/fns'
  import { KEY_TOKEN } from '@/models/project/local-storage-keys/keys'

  @Component({})
  export default class BaseUpload extends Vue {
    @Prop() public props!: object
    @Prop({
      default () {
        const me: any = this
        return `请选择${ me.props.accept ? me.props.accept.split(',').join('、') : '' }文件`
      },
    }) public tipText!: string
    public token = gc(KEY_TOKEN)
    public defaultProps = {
      withCredentials: true,
      headers: {
        'x-access-token': this.token,
      },
    }

    public get localProps () {
      return {
        ...this.defaultProps,
        ...this.props,
      }
    }
  }
</script>
<style lang="less" scoped>

</style>
