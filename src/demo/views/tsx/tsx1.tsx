import { Component, Vue } from 'vue-property-decorator'
import { Schema } from '@/components/common-form/form.model'
import { fb, requiredRuleProp } from '@/util/common/fns/fns-form'
import TsxComponent from '@/demo/views/tsx/TsxComponent'

/**
 * @date 2019-12-03
 * 体验 tsx 的写法
 * 1. 写组件会比较合适，方便，功能强大
 * 2. 写业务代码不是很方便
 */
@Component({})
export default class TsxDemo1 extends Vue {
  public value = ''
  public schema: Schema[] = [
    {
      prop: 'name',
      label: '名称',
      ...requiredRuleProp,
    },
  ]
  public form = fb(this.schema)
  public get showForm () {
    return JSON.stringify(this.form)
  }
  protected render () {
    return (
      <div>
        <div class="demo-page">
          <h2>TSX demo</h2>
          <h3>1. 简单测试</h3>
          <div class="demo-box">
            <div class="demo-line">
              <div class="demo-value">{ this.value }</div>
              <el-input v-model={this.value} onChange={this.inputChange}>
              </el-input>
            </div>
          </div>
          <h3>2. 使用组件</h3>
          <div class="demo-box">
            <div class="demo-line">
              <div class="demo-value">
                {this.showForm}
              </div>
              <base-form
                ref="form"
                schema={this.schema}
                v-model={this.form}
              >
                <el-button onClick={this.submitForm}>提交</el-button>
                <el-button onClick={this.setForm}>赋值</el-button>
              </base-form>
            </div>
          </div>
          <h3>3. 使用自定义的TSX组件</h3>
          <TsxComponent msg="传入的内容是msg" onDone={this.done}/>
        </div>
        <div class="h1000">
        
        </div>
      </div>
    )
  }
  private inputChange () {
    console.log(this.value, 'value')
  }
  private submitForm () {
    (this.$refs.form as any).$refs.form.validate((valid: boolean) => {
      if (valid) {
        this.$success('表单验证成功')
      }
    })
  }
  private setForm () {
    this.form.name = '321'
  }
  public done (content: any) {
    console.log('done', content, this.form)
  }
}
