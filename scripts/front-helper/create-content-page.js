const util = require('../util/util')

function getContent(moduleConfig, item) {
  const mn = util.getLineName(moduleConfig.module.name)
  const itemName = util.getLineName(item.name)
  return `<template>
  <el-container class="h">
    <el-main class="h">
      <div class="common-query">
        <base-form :schema="schema" v-model="form" inline @create="handleClick"></base-form>
      </div>
      <base-table
        ref="table"
        :url="url"
        :columns.sync="columns"
        :params.sync="form"
      >
        <template v-slot:op="{row}">
          <el-button type="primary" plain @click="toEdit(row)">编辑</el-button>
          <base-confirm class="ml10" @confirm="del(row)"></base-confirm>
        </template>
      </base-table>
    </el-main>
  </el-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import {Column, columnWidth} from '@/components/common-table/table.model'
  import {Schema} from '@/components/common-form/form.model'
  import {fb} from '@/util/common/fns/fns-form'
  import {HttpRes} from '@/model/common/models'

  @Component({})
  export default class ${ util.getClassName(mn, itemName) } extends Vue {
    public schema: Schema[] = [
      {
        prop: 'keywords',
        label: '搜索',
      }
    ]
    public form = fb(this.schema)
    public url = this.$urls.tenant.list
    public columns: Column[] = [
      {
        prop: 'name',
        label: '名称',
      },
      {
        prop: 'code',
        label: '编码',
      },
      {
        contentSlot: 'op',
        label: '操作',
        props: {
          width: columnWidth.w180,
        },
      },
    ]
    // 跳转到创建页面
    public handleClick () {
      this.$router.push({name: '${ mn }-${ itemName }-detail', params: {pattern: 'create'}})
    }
    // 执行删除
    public del (row: any) {
      this.$req(this.$urls.tenant.delete, {id: row.id}).then((res: HttpRes) => {
        if (res.code === 200) {
          (this.$refs.table as any).search(true)
        }
        // 根据请求结果进行提示
        this.$tip(res)
      })
    }
    // 跳转到编辑页面
    public toEdit (row: any) {
      this.$router.push({name: '${ mn }-${ itemName }-detail', params: {pattern: 'edit', id: row.id}})
    }
  }
</script>
<style scoped lang="less">

</style>
`
}

module.exports = getContent
