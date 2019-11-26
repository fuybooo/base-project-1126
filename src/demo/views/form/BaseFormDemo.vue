<template>
  <el-container class="h">
    <el-main class="h">
      {{form}}
      <base-form :form-props="formProps" :inline="false" :schema="schema" :span="8" is-row v-model="form">
        <template slot="upload">
          <el-upload v-bind="uploadProps">
            <el-button>上传文件</el-button>
          </el-upload>
        </template>
      </base-form>
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
  export default class BaseFormDemo extends Vue {
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
      {
        label: '数字框',
        prop: 'number',
        placeholder: '这是placeholder',
        nodeProperty: {
          class: 'xxx',
        },
      },
      {
        label: '文本域',
        prop: 'textarea',
        props: {
          type: 'textarea',
        },
        placeholder: '这是placeholder',
        span: 24,
      },
      {
        label: '日期框',
        prop: 'date',
        comp: 'date',
        props: {
          type: 'date',
        },
      },
      {
        label: '年份框',
        prop: 'year',
        comp: 'date',
        props: {
          type: 'year',
        },
      },
      {
        label: '月份框',
        prop: 'month',
        comp: 'date',
        props: {
          type: 'month',
        },
      },
      {
        label: '多个日期框',
        prop: 'dates',
        comp: 'date',
        props: {
          type: 'dates',
        },
      },
      {
        label: '星期框',
        prop: 'week',
        comp: 'date',
        props: {
          type: 'week',
        },
      },
      {
        label: '时间框',
        prop: 'datetime',
        comp: 'date',
        props: {
          type: 'datetime',
        },
      },
      {
        label: '月份范围框',
        prop: 'monthRange',
        comp: 'date',
        startProp: 'startMonthRange',
        endProp: 'endMonthRange',
        props: {
          type: 'monthrange',
          startPlaceholder: '开始',
          endPlaceholder: '结束',
        },
      },
      {
        label: '日期范围框',
        prop: 'dateRange',
        comp: 'date',
        startProp: 'startDate',
        endProp: 'endDate',
        props: {
          type: 'daterange',
          startPlaceholder: '开始',
          endPlaceholder: '结束',
        },
      },
      {
        label: '时间范围框',
        prop: 'datetimeRange',
        comp: 'date',
        startProp: 'startDateTime',
        endProp: 'endDateTime',
        props: {
          type: 'datetimerange',
          startPlaceholder: '开始',
          endPlaceholder: '结束',
        },
      },
      {
        label: '选择框',
        prop: 'select',
        comp: 'select',
        initValue: '2',
        nodeProperty: {
          // 这种绑定无法访问this
          on: {
            change (val: any) {
              console.log(val, 'on')
            },
          },
        },
        props: {
          options: [],
        },
      },
      {
        label: '多选框',
        prop: 'mulSelect',
        comp: 'select',
        props: {
          options: [],
          multiple: true,
        },
      },
      {
        label: '单选组',
        prop: 'radio',
        comp: 'radio',
        initValue: '1',
        props: {
          options: [],
        },
      },
      {
        label: '多选组',
        prop: 'checkbox',
        comp: 'checkbox',
        // initValue: ['1'],
        props: {
          options: [],
        },
      },
      {
        label: '级联选择',
        prop: 'cascader',
        comp: 'cascader',
        props: {
          options: [],
        },
      },
      {
        label: '开关',
        prop: 'switch',
        comp: 'switch',
        initValue: false,
      },
      {
        label: '滑块',
        prop: 'slider',
        comp: 'slider',
      },
      {
        label: 'slot上传',
        prop: 'upload',
        comp: 'slot',
      },
      {
        label: '上传',
        prop: 'upload2',
        comp: 'upload',
        span: 24,
        props: {
          action: 'https://jsonplaceholder.typicode.com/posts/',
          'list-type': 'picture-card',
          'on-success' () {},
          'on-remove' () {},
        },
      },
      {
        label: '评分',
        prop: 'rate',
        comp: 'rate',
      },
      {
        label: '颜色选择器',
        prop: 'color',
        comp: 'color',
      },
      {
        label: '穿梭框',
        prop: 'transfer',
        comp: 'transfer',
        span: 24,
      },
      {
        label: '图片裁剪',
        prop: 'cropper',
        comp: 'base-cropper',
        formItemNodeProperty: {
          style: {
            height: '300px',
          },
        },
        span: 24,
      },
      {
        label: '图片裁剪回显',
        prop: 'cropperView',
        comp: 'base-cropper',
        formItemNodeProperty: {
          style: {
            height: '300px',
          },
        },
        span: 24,
        props: {
          pattern: 'view',
        },
      },
      {
        label: '单选加输入框',
        prop: 'radioInput',
        comp: 'base-radio-input',
        span: 6,
        props: {},
      },
      {
        label: '回显radioInput',
        prop: 'radioInput',
        comp: 'base-radio-input',
        span: 6,
        props: {
          pattern: 'view',
        },
      },
      {
        label: '远程选择框',
        prop: 'remoteSelect',
        comp: 'base-remote-select',
        span: 6,
        props: {
          type: 'staff',
        },
      },
      {
        label: '远程选择框回显',
        prop: 'remoteSelectView',
        comp: 'base-remote-select',
        initValue: '1',
        span: 6,
        props: {
          type: 'staff',
          pattern: 'view',
        },
      },
    ]
    public form = fb(this.schema)
    public uploadProps = {}

    public created () {
      const me = this
      const options: Option[] = [
        {
          id: '1',
          label: '选项一',
        },
        {
          id: '2',
          label: '选项二',
        },
      ]
      setProperty(this.schema, 'select', {
        props: {
          options: options.map(item => ({
            id: item.id,
            label: `${ item.label }(${ item.id })`,
          })),
        },
        // 在 created 方法中设置change事件可以访问 this
        nodeProperty: {
          on: {
            change (val: any) {
              console.log(val, me.schema, 'on')
            },
          },
        },
      })
      setProperty(this.schema, 'remoteSelect', {
        // 在 created 方法中设置change事件可以访问 this
        nodeProperty: {
          on: {
            change (val: any) {
              console.log(val, me.schema, 'on remoteSelect')
            },
          },
        },
      })
      setProperty(this.schema, 'mulSelect', { props: { options } })
      setProperty(this.schema, 'radio', { props: { options } })
      setProperty(this.schema, 'checkbox', { props: { options } })
      setProperty(this.schema, 'cascader', { props: { options: cascaderOptions } })
      setProperty(this.schema, 'transfer', {
        props: {
          data: Array(15).fill(0).map((item, i) => ({
            key: i, label: `备选项${ i }`, disabled: i % 4 === 0,
          })),
        },
      })
      this.uploadProps = {
        action: 'https://jsonplaceholder.typicode.com/posts/',
        'on-success' () {
          // on-success 没有被触发，不知道为啥
          console.log(me, arguments, '上传成功回调')
        },
        'on-remove' () {
          console.log(me, arguments, 'remove回调')
        },
      }
      // 上传控件的方法绑定
      setProperty(this.schema, 'upload2', {
        props: {
          'on-remove' () {
            console.log(me, arguments, 'remove的回调')
          },
          'on-success' () {
            console.log(me, arguments, '上传成功回调')
          },
        },
      })
      // 赋值
      // this.form.number = this.schema.length // 若赋初始值时需要访问this，此时需要在created中赋值
      // this.form.name = 3
      // this.form.date = '2019-06-23'
      // this.form.datetimeRange = ['2019-06-11 12:00:00', '2019-06-13 13:13:13']
      this.form.cropperView = `data:image/jpeg;base64,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MaGdidxcf06Uv2NueOJcmNDOxO4uP6dJfsbc8cS5MaGdidxcf06S/Y2544lyY0M7E7i4/p0l+xtzxxLkxoZ2J3Fx/TpL9jbnji25NvwezMd8E/Avp0xu84lY+Oc/698+U1FyeRt/0x42JcU7EcMGo+O9a2eiafVkehHIWf6Y8LWo+ATntoss6sT5LfnTO+G3I5HspcVmimzupYn451+OFUNj0Itn/Jtz/wCGcnRC3HPPTVHbER/2k/HbP38Z8plS5NnwJ1V/aXHGxE9MxGLN+dMb5Lk8jOqv7UuKNizujzmS/I1xvlxPoRZlwEcP/jV4rccx+2qz/wBc3DyL+iP3xH+Uubkcj2S44+XG6MVj471901Tgy5MaGdidyXH9Olb9jbnjiXJjQzsTuLj+nSX7G3PHEuTGhnYncXH9Okv2NueOJcm34M7Ex3wXFb+yI7LJ8S/Y2544tuRyPZLjiP2z3Ux5JPx6z9++aodx6EToMuamuPCfEuO3TTOuLaY80v2390T3zLq5PITqr+1bijYie6PKYL8jXG+X+0+z4CMmCpjofpvJZPYp3P4Pl8rtzwwd0YtgJttwVPFn+v1OSyWxTuOXyu3PDB37Ji+ip695yWS2Kdxy+V254YNjFsBGTBUajksnsU7k5bK7dW9sYri8zFuCo4ZzZzkclsU7k5Sval3GKYGmY/6VMx9I744cicjktiOOLnOUy0fvmY6IjwsU9mxfRUal5LJbFO5nlsrtzwwPZsX0VGo5LJbFO51jKZSzPXNvdm6D2bF9FRqOSyWxTuXlK9qT2bF9FRqOSyWxTuXlsrt1bz2bF9FRqOSyWxTuOVyu3VvPZsX0VGo5LJbFO5OUr2pPZsX0VGo5LJbFO5mrKZWzNXPZmz8Gey4voqeveclktinc5ctldureeyYvoqeveclktinccrldureeyYvoqeveclktinccrldureeyYvoqeveclktinccrldureeyYvoqeveclktinccrldureeyYvoqeveclktinccrldureeyYvoqeveclktinccrldureeyYvoqeveclktinccrldureeyYvoqeveclktinccrldureeyYvoqeveclktinccrldure32XF4+FRqt75OSyexTuOWyu3VvbTiuAmbIwVEfWziXksnOmiJ7jlcpOmuqe9b2TF9FT1705LJbFO5OUr2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`
    }

  }
</script>
<style lang="less" scoped>
</style>
