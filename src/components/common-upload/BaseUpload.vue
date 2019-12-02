<template>
  <el-upload
    class="base-upload"
    ref="upload"
    v-bind="localProps">
    <template>
      <slot>
        <el-button size="small" type="primary">点击上传</el-button>
      </slot>
    </template>
    <template slot="tip">
      <slot name="tip">
        <div class="el-upload__tip">{{tipText}}</div>
      </slot>
    </template>
  </el-upload>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import './BaseUpload.less'
  import { gc } from '@/util/common/fns/fns'
  import { KEY_TOKEN } from '@/models/project/local-storage-keys/keys'

  @Component({})
  export default class BaseUpload extends Vue {
    @Prop() public props!: object
    @Prop({
      default () {
        const me: any = this
        return `请选择${ me.props.accept ? me.props.accept.split(',').join('、') : '' }文件`
      },
    }) public tipText!: string
    public token = gc(KEY_TOKEN)
    public defaultProps = {
      action: this.$config.uploadUrl,
      withCredentials: true,
      headers: {
        'x-access-token': 'HfSY5vxKqrIqkcuSGI0MSNYUsPMgGnrxQ35N6UHkGegqHiexqeFx59TtJuqxrUGndzHweVNgswPDeHfYByJ2s6+aQIhd9U3UvtCMqndNeIYVLRr3vBK5nAVbguykwf+VOt/+lBNv+aCTZlq1XRKwBQAtEvB+PhBGqMuC/8o22e4=,J4dDkfS2IyRlKOY/GFMwKaxPENucgBh58I3dxmixdCU5xfKNYCH4DQhDJ8zb7beAywqRGkjG9SwWOocrP7BZuK2aoO2i11KNf6PNSIOH+XLVOL+PgXwMxNAen5vYwYHrAfK6qYjSMfyOR6BDEItaB9GaQ1ovUihhQJVF9GtzHgI=,gb59XjIN+uJG9R2mAxcIJW2XlBTA17/c7gey1P9ksNdZWDMafxU+GvXpOd1+w3mAdcsW+lEsWJoXHGaWdhxi19J2/zSKCz7zASS8XXDnfNIRMuUI8YWub3oFMEY9j9lBpRK0U/vwqUtsSYSuXs7nbzXNFif4LF56qcCDV0eUsDE=,evDCTp+oYSUVMNrszASN8LcAo49yYRJHVNGEHP235ERA6RGaKyCxhSi4AtQcTbVIu2OMRbzFUNOZvLvqliMjkeRXlZggEiv/A/6nKrD5Ul8MrpYzHZguqGylvvv42hVNm1N8ZKVEHPCqxchAOqbeK9RS7grYX5NkbEDI+d85hN4=',
      },
    }

    public get localProps () {
      return {
        ...this.defaultProps,
        ...this.props,
      }
    }
  }
</script>
<style lang="less" scoped>

</style>
