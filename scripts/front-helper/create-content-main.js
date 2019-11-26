const util = require('../util/util')

function getContent(moduleConfig) {
  const mn = util.getCamelName(moduleConfig.module.name)
  return (
    `<template>
  <el-container class="h">
    <el-main class="common-el-main-padding h">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'

  @Component({})
  export default class ${ mn } extends Vue {
  }
</script>
<style scoped lang="less">

</style>
`)
}

module.exports = getContent
