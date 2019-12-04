import { Component, Prop, Vue } from 'vue-property-decorator'
import { Schema } from '@/components/common-form/form.model'
import V from 'vue'

@Component({})
export default class AppForm extends Vue {
  @Prop({default () { return {} }}) public value!: any
  @Prop({default () { return {} }}) public formProps!: any
  @Prop({default () { return [] }}) public schema!: Schema[]
  @Prop({default: true, type: Boolean}) public useDefaultBtnStyle!: boolean
  public render (h: typeof V.prototype.$createElement) {
    // console.log(this.value, 'render - this.value')
    const formProps = {
      model: this.value,
      ...this.formProps,
    }
    return (
      <el-form
        ref={'form'}
        props={formProps}
      >
        {
          this.schema.map((item, index) => (
            <el-form-item
              props={this.getItemProps(item, index)}
            >
              {
                this.getItemControl(h, item, index)
              }
            </el-form-item>
          ))
        }
        {
          this.useDefaultBtnStyle ?
          (
            <el-form-item>
              {this.$slots.default}
           </el-form-item>
          ) : (
              this.$slots.default
            )
        }
      </el-form>
    )
  }
  public getItemProps (item: Schema, index: number) {
    return {
      key: index,
      prop: item.prop,
      label: item.label,
    }
  }
  public getItemControl (h: typeof V.prototype.$createElment, item: Schema, index: number) {
    const me = this
    return h(item.comp || 'el-input', {
      props: {
        key: index,
        // @ts-ignore
        value: this.value[item.prop],
      },
      on: {
        input (val: any) {
          // @ts-ignore
          me.value[item.prop] = val
        },
        change (val: any) {
          // @ts-ignore
          me.value[item.prop] = val
        },
      },
    })
  }
}
