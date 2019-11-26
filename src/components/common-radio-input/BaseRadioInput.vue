<template>
  <div>
    <base-flex :class="'base-radio-input ' + className" :fixed="fixed" :fixed-width="fixedStyle.width"
               v-if="pattern === 'create'">
      <el-radio-group @change="changeRadio" slot="fixed" v-model="localValue.radio">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="0">否</el-radio>
      </el-radio-group>
      <el-input @change="changeInput" @input="changeInput" placeholder="无" v-model="localValue.text"></el-input>
    </base-flex>
    <span class="base-radio-input-view" v-else-if="pattern === 'view'">{{ localValue.text || '无' }}</span>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import './BaseRadioInput.less'
  import { Pattern } from '@/models/common/models'

  @Component({})
  export default class BaseRadioInput extends Vue {
    @Prop({ default: 90 }) public fixedWidth!: string | number
    @Prop({ default: 'before' }) public fixed!: string
    @Prop({ default: '' }) public className!: string
    @Prop({ default () { return { radio: 0, text: '' } } }) public value!: any
    @Prop({ default: 'create' }) public pattern!: Pattern
    public localValue = {
      radio: this.value.radio || 0,
      text: this.value.text || '',
    }

    public get fixedStyle () {
      return {
        width: typeof this.fixedWidth === 'string' ? this.fixedWidth : (this.fixedWidth + 'px'),
      }
    }

    public changeInput () {
      // if (!this.localValue.radio) {
      //   this.localValue.text = ''
      // }
      const value = {
        radio: this.localValue.radio,
        text: this.localValue.text,
      }
      this.$emit('input', value)
      this.$emit('change', value)
    }

    public changeRadio () {
      this.changeInput()
    }
  }
</script>
<style lang="less" scoped>

</style>
