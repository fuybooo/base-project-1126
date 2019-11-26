<template>
  <div :class="['base-flex common' + className, {'between': fixed === 'between'}]">
    <div class="base-flex-default" v-if="fixed === 'after'">
      <slot></slot>
    </div>
    <div :style="fixedStyle" class="base-flex-fixed" v-if="fixed === 'before' || fixed === 'after'">
      <slot name="fixed"></slot>
    </div>
    <div class="base-flex-default" v-if="fixed === 'before'">
      <slot></slot>
    </div>
    <slot v-if="fixed === 'between'"></slot>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import './BaseFlex.less'

  @Component({})
  export default class BaseFlex extends Vue {
    @Prop({ default: 0 }) public fixedWidth!: string | number
    @Prop({ default: 'after' }) public fixed!: string
    @Prop({ default: '' }) public className!: string

    public get fixedStyle () {
      return {
        width: typeof this.fixedWidth === 'string' ? this.fixedWidth : (this.fixedWidth + 'px'),
      }
    }
  }
</script>
<style lang="less" scoped>

</style>
