<template>
  <div>
    {{defaultValue}}
    <el-cascader
      :options="options"
      :props="{ multiple: true, checkStrictly: true }"
      class="w"
      clearable
      v-model="defaultValue"
    ></el-cascader>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { cascaderOptions } from '@/demo/models/demo.model'

  @Component({})
  export default class Input extends Vue {
    public options = cascaderOptions
    public defaultValue = [ [ 'zujian' ], [ 'ziyuan' ], [ 'zhinan' ] ]
  }
</script>
<style lang="less" scoped>

</style>
