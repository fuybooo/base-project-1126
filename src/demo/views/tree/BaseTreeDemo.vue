<template>
  <el-container class="h">
    <el-main class="h">
      <div class="common-query">
        <base-form :schema="schema" @create="handleClick" inline v-model="form"></base-form>
      </div>
      <el-tree
        :data="data"
        :default-checked-keys="defaultCheckedKeys"
        check-strictly
        default-expand-all
        node-key="id"
        show-checkbox>
      </el-tree>
      <demo-log :data="logData"></demo-log>
    </el-main>
  </el-container>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Schema } from '@/components/common-form/form.model'
  import { fb } from '@/util/common/fns/fns-form'
  import DemoLog from '@/demo/views/log/DemoLog.vue'

  @Component({ components: { DemoLog } })
  export default class BaseTableDemo extends Vue {
    public schema: Schema[] = []
    public form = fb(this.schema)
    public data = [
      {
        id: 1,
        label: '一级 2',
        children: [
          {
            id: 3,
            label: '二级 2-1',
            children: [
              {
                id: 4,
                label: '三级 3-1-1',
              },
              {
                id: 5,
                label: '三级 3-1-2',
              },
            ],
          },
          {
            id: 2,
            label: '二级 2-2',
            children: [
              {
                id: 6,
                label: '三级 3-2-1',
              }, {
                id: 7,
                label: '三级 3-2-2',
              },
            ],
          },
        ],
      },
    ]
    public logData = [
      {
        datetime: '2018-08-29',
        goal: '测试默认选中效果',
        result: '默认选中父节点时，其所有的子节点都会被选中；若 check-strictly 为 true 则其子节点不会被勾选',
      },
    ]
    public defaultCheckedKeys = [ 2 ]

    public handleClick () {
    }
  }
</script>
<style lang="less" scoped>

</style>
