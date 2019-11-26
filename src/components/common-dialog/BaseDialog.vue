<template>
  <el-dialog
    :visible.sync="localVisible"
    class="base-dialog"
    ref="dialog"
    v-bind="localProps"
  >
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <template>
      <slot></slot>
    </template>
    <template slot="footer" v-if="footer">
      <slot name="footer">
        <template v-if="onlyOk">
          <el-button @click="ok" type="dp">{{ okBtnText }}</el-button>
        </template>
        <template v-else-if="onlyCancel">
          <el-button @click="cancel" type="dp">{{ cancelBtnText }}</el-button>
        </template>
        <template v-else>
          <el-button @click="cancel">{{ cancelBtnText }}</el-button>
          <el-button @click="ok" type="dp">{{ okBtnText }}</el-button>
        </template>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
  import './BaseDialog.less'

  @Component({})
  export default class BaseDialog extends Vue {
    @Prop({ default: false, type: Boolean }) public visible!: boolean
    @Prop() public props!: object
    @Prop({ default: false, type: Boolean }) public autoClose!: boolean
    @Prop({ default: true, type: Boolean }) public onlyOk!: boolean
    @Prop({ default: false, type: Boolean }) public onlyCancel!: boolean
    @Prop({ default: true, type: Boolean }) public footer!: boolean
    @Prop({ default: '确定' }) public okBtnText!: string
    @Prop({ default: '取消' }) public cancelBtnText!: string
    public localVisible = this.visible
    public defaultProps = {
      'close-on-click-modal': false, // 防止误操作，默认的弹出框在点击modal层时不会关闭弹窗
    }

    public get localProps () {
      return {
        ...this.defaultProps,
        ...this.props,
      }
    }

    @Watch('visible')
    public visibleChange () {
      this.localVisible = this.visible
    }

    @Watch('localVisible')
    public localVisibleChange () {
      this.$emit('update:visible', this.localVisible)
    }

    @Emit()
    public cancel () {
      if (this.autoClose) {
        this.localVisible = false
      }
    }

    @Emit()
    public ok () {
      if (this.autoClose) {
        this.localVisible = false
      }
    }
  }
</script>
<style lang="less" scoped>

</style>
