<template>
  <div class="demo-log-box">
    <div class="title">
    </div>
    <base-table
      :auto-height="false"
      :columns.sync="columns"
      :is-pagination="false"
      :table-props="tableProps"
      ref="table"
    ></base-table>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { Column } from '@/components/common-table/table.model'

  @Component({})
  export default class DemoLog extends Vue {
    @Prop() public data!: any[]
    public columns: Column[] = [
      {
        prop: 'datetime',
        label: '时间',
      },
      {
        prop: 'goal',
        label: '测试目的',
      },
      {
        prop: 'result',
        label: '测试结果',
      },
    ]

    public get tableProps () {
      return {
        data: this.data,
      }
    }
  }
</script>
<style lang="less" scoped>

</style>
