<template>
  <el-container class="h">
    <el-main class="h">
      {{form}}
      <app-form
        ref="form"
        :schema="schema"
        v-model="form"
        :form-props="formProps"
        :span="8"
      >
        <el-button @click="submitForm">提交</el-button>
      </app-form>
      <div class="h"></div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Option, Schema } from '@/components/common-form/form.model'
  import { fb } from '@/util/common/fns/fns-form'
  import { cascaderOptions } from '@/demo/models/demo.model'
  import { setProperty } from '@/util/common/fns/fns-common'

  /**
   * 该demo展示了base-form表单基本组件的基础用法
   */
  @Component({})
  export default class AppFormDemo extends Vue {
    public formProps = {
      labelWidth: '150px',
    }
    public schema: Schema[] = [
      {
        label: '普通文本',
        prop: 'name',
        placeholder: '这是placeholder',
        nodeProperty: {
          class: 'xxx',
        },
        initValue: '赋初始值', // 赋一个写死的初始值
        formItemProps: {
          rules: [
            { required: true },
            { max: 6, min: 2 },
          ],
        },
      },
    ]
    public form = fb(this.schema)
    public submitForm () {
      (this.$refs.form as any).$refs.form.validate((valid: boolean) => {
        if (valid) {
          this.$success('提交成功')
          console.log('表单信息：', this.form)
        }
      })
    }
  }
</script>
<style lang="less" scoped>
</style>
