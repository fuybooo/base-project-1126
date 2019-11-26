<template>
  <el-button :loading="loading" :plain="btnPlain" :type="btnType" @click="handleClick">{{text}}</el-button>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

  @Component({})
  export default class BaseAction extends Vue {
    @Prop({ default: '保存' }) public btnText!: string
    @Prop({ default: '保存中...' }) public btnLoadingText!: string
    @Prop({ default: 'primary' }) public btnType!: string
    @Prop({ default: false }) public btnPlain!: boolean
    @Prop({ default: false }) public loading!: boolean
    public text = this.btnText

    @Watch('loading', { immediate: true })
    public loadingChange (loading: boolean) {
      this.text = loading ? this.btnLoadingText : this.btnText
    }

    public handleClick () {
      this.$emit('update:loading', true)
      this.$emit('click')
    }
  }
</script>
<style lang="less" scoped>
  .base-confirm-btn-box {
    .el-button.el-button--mini {
      padding: 4px 10px;
    }
  }
</style>
