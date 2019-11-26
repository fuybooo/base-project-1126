<template>
  <el-container class="h demo">
    <el-main class="common-el-main-padding h">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import '@/demo/assets/less/index.less'

  @Component({})
  export default class Demo extends Vue {
  }
</script>
<style lang="less" scoped>

</style>
