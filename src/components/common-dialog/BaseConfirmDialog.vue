<template>
  <base-dialog :props="localProps" :visible.sync="localVisible" class="confirm-dialog">
    <div class="base-confirm-dialog-content">
      <div class="el-message-box__content">
        <div class="el-message-box__status el-icon-warning">
        </div>
        <div class="el-message-box__message">
          <slot>确认删除吗？</slot>
        </div>
      </div>
    </div>
    <div slot="footer">
      <el-button @click="cancel">取消</el-button>
      <el-button @click="ok" type="dp">确认</el-button>
    </div>
  </base-dialog>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

  @Component({})
  export default class BaseConfirmDialog extends Vue {
    @Prop({ default: false }) public visible!: boolean
    @Prop() public props!: object
    public localVisible = this.visible

    public defaultProps = {
      title: '提示',
      width: '420px',
      appendToBody: true,
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

    public cancel () {
      this.localVisible = false
      this.$emit('cancel')
    }

    public ok () {
      this.$emit('ok')
    }
  }
</script>
<style lang="less" scoped>

</style>
