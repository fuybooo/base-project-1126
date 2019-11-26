<template>
  <el-container class="h base-header-page is-vertical">
    <el-header class="page-header" v-if="$slots.header">
      <slot name="header"></slot>
    </el-header>
    <el-main class="page-main">
      <slot></slot>
    </el-main>
  </el-container>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({})
  export default class BaseHeaderPage extends Vue {
  }
</script>
<style lang="less" scoped>

</style>
