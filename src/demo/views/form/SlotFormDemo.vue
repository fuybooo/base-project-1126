<template>
  <el-container class="h">
    <el-main class="h">
      <h1>只有复杂的无法用组件实现的表单元素才用slot插槽实现</h1>
      {{form}}
      <base-form :schema="schema" v-model="form">
        <template slot="name">
          <el-input placeholder="这里是slot的内容" v-model="form.name"></el-input>
        </template>
      </base-form>
    </el-main>
  </el-container>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Schema } from '@/components/common-form/form.model'
  import { fb } from '@/util/common/fns/fns-form'

  @Component({})
  export default class SlotFormDemo extends Vue {
    public schema: Schema[] = [
      {
        label: '名称',
        prop: 'name',
        comp: 'slot',
      },
    ]
    public form = fb(this.schema)

    public created () {
      // 赋值
      this.form.name = 3
      this.form.date = '2019-06-23'
      this.form.datetimeRange = [ '2019-06-11 12:00:00', '2019-06-13 13:13:13' ]
    }
  }
</script>
<style lang="less" scoped>

</style>
