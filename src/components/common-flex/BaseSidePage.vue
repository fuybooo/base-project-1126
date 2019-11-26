<template>
  <base-flex :fixed-width="fixedWidth" class="common-side-page" fixed="before">
    <div class="common-side-page-left" slot="fixed">
      <slot name="left"></slot>
    </div>
    <div class="common-side-page-right">
      <slot></slot>
    </div>
  </base-flex>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({})
  export default class BaseSidePage extends Vue {
    @Prop({ default: 240 }) public fixedWidth!: string | number
  }
</script>
<style lang="less" scoped>

</style>
