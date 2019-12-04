import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class TsxComponent extends Vue {
  @Prop({default: '默认内容'})
  public msg!: string
  protected render () {
    return (
      <base-header-page>
        <div slot="header">
          头部
        </div>
        <div>{this.msg}</div>
        <el-button onClick={this.handleClick}>发出事件</el-button>
      </base-header-page>
    )
  }
  public handleClick () {
    this.$emit('done', {name: 'abc'})
  }
}
