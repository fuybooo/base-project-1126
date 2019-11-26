<template>
  <div>
    通过计算属性计算出来的值name:{{ name }}
    传进来的property:{{ property }}
    columns: {{ columns }}
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

  @Component({})
  export default class DemoProp extends Vue {
    @Prop({ default: '1' }) public property!: string
    public columns: any = []

    public get name () {
      this.columns = this.property === '1' ? [ 1 ] : [ 2 ]
      return this.property === '1' ? 'init' : 'init2'
    }

    @Watch('property', { immediate: true })
    public changeProperty (newValue: string) {
      if (newValue === '1') {
        console.log('property变为了1时打印：', this.property, newValue)
      } else {
        console.log('property变为了非1时打印：', this.property, newValue)
      }
    }
  }
</script>
<style lang="less" scoped>

</style>
