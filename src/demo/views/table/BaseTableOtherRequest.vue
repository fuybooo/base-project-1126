<template>
  <el-container class="h">
    <el-main class="h">
      <div class="common-query">
        <base-form :schema="schema" inline v-model="form"></base-form>
      </div>
      <base-table
        :columns.sync="columns"
        :params.sync="form"
        :url="url"
        method="get"
        :axios-inst="axiosInst"
        simple
        ref="table"
      >
      </base-table>
    </el-main>
  </el-container>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Column } from '@/components/common-table/table.model'
  import { Schema } from '@/components/common-form/form.model'
  import { fb } from '@/util/common/fns/fns-form'
  import { create } from '@/api/base-axios'

  @Component({})
  export default class BaseTableOtherRequest extends Vue {
    public schema: Schema[] = [
      {
        label: '搜索',
        prop: 'keyword',
      },
    ]
    public form = fb(this.schema, {
      tenantId: 1,
    })
    public url = 'listByTenant'
    public columns: Column[] = [
      {
        prop: 'name',
        label: '姓名',
      },
    ]
    public axiosInst = create({}, {
      baseURL: 'http://devglobal.everjiankang.com.cn/api/global-platform-extend/weChat/appInfo/'
    })

    public created () {
      this.axiosInst.interceptors.request.use(config => {
        config.headers['x-access-token'] = `E8ytesuTd2hSKi8qjSK/0vDJMzo1Wt5QpcjbX43hxH8piiYxVwVeJANL3muh2klSP45FZuEQcbYfaRXc8tmq6CWKeO3lAg4pHJ0fYp8Pc/cksfH8nPX4z3B6ENyWR2hA5+MAymdU8MU6jE8VR0LFvKchvhaxYaU3MRbHOkX18JY=`
        return config
      })
    }
  }
</script>
<style lang="less" scoped>

</style>
