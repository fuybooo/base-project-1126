<template>
  <el-container class="h">
    <el-main class="h">
      <el-row>
        <el-col :span="8">
          {{form}}
          <base-form
            :form-pattern.sync="formPattern"
            :form-props="formProps"
            :inline="false"
            :schema="schema"
            @submit="submit"
            is-row
            ref="form"
            v-model="form"
          ></base-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { HttpRes, Pattern } from '@/models/common/models'
  import { Schema } from '@/components/common-form/form.model'
  import { fb, setFormData } from '@/util/common/fns/fns-form'
  import { genderList } from '@/models/project/models'

  @Component({})
  export default class FormDetailDemo extends Vue {
    public formPattern: Pattern = 'create'
    public id = ''
    // 验证规则写在Schema中
    public schema: Schema[] = [
      {
        prop: 'name',
        label: '名称',
        formItemProps: {
          rules: [
            { required: true },
            { max: 6, min: 2 },
          ],
        },
      },
      {
        prop: 'age',
        label: '年龄',
        formItemProps: {
          rules: [
            { required: true, message: '必填' },
          ],
        },
      },
      {
        prop: 'gender',
        label: '性别',
        comp: 'radio',
        initValue: 1,
        props: {
          options: genderList,
        },
        formItemProps: {
          rules: [
            { required: true, message: '必填' },
          ],
        },
      },
      {
        label: '地址',
        prop: 'address',
        props: {
          type: 'textarea',
        },
        placeholder: '请填写地址',
      },
    ]
    public form = fb(this.schema)
    public formProps = {}

    public created () {
      this.formPattern = this.$route.params.pattern as Pattern
      if (this.formPattern === 'view' || this.formPattern === 'edit') {
        this.id = this.$route.params.id
        this.search()
      }
    }

    public search () {
      this.$req(this.$urls.demo.table.getById, { id: this.id }).then((res: HttpRes) => {
        if (res.code === 200) {
          this.updateForm(res.data)
        }
      })
    }

    public updateForm (formData: any) {
      setFormData(this.form, formData)
    }

    public submit () {
      (this.$refs.form as any).$refs.form.validate((valid: boolean) => {
        if (valid) {
          // todo 使用mongodb保存数据
          // todo 跳转的id从后端获取
          this.$router.push({ name: 'demo-form-detail', params: { pattern: 'view', id: this.id || 'id-001' } })
          this.formPattern = 'view'
        } else {
          return false
        }
      })
    }
  }
</script>
<style lang="less" scoped>

</style>
