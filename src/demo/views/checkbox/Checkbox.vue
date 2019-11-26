<template>
  <div>
    {{checkList}}
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="复选框 A">内容哦</el-checkbox>
      <el-checkbox label="复选框 B"></el-checkbox>
      <el-checkbox label="复选框 C"></el-checkbox>
      <el-checkbox label="禁用"></el-checkbox>
      <el-checkbox label="选中且禁用"></el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({})
  export default class Checkbox extends Vue {
    public checkList = []
  }
</script>
<style lang="less" scoped>

</style>
