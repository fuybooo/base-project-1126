<template>
  <base-flex class="p0i" fixed="before" fixedWidth="320px">
    <el-cascader
      slot="fixed"
      class="w"
      v-model="address.area"
      :options="addressOption"
      filterable
      clearable
      :disabled="disabled"
      :filter-method="filterMethod"
      :placeholder="selectPlaceholder"
      @change="changeSelect"
    ></el-cascader>
    <el-input :disabled="disabled"
              class="ml10"
              @change="changeInput"
              clearable
              v-model="address.detail"
              placeholder="请输入详细地址，如：xxx街道xxx小区xxx单元xxx室"></el-input>
  </base-flex>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  const addressList = require('../../../public/data/area/area-data.json')

  @Component({})
  export default class BaseAddress extends Vue {
    @Prop({default () { return {} }, type: Object}) public value!: any
    @Prop({default: '请输入关键字搜索'}) public selectPlaceholder!: string
    @Prop({default: false, type: Boolean}) public disabled!: boolean
    public address = this.value
    public addressOption = addressList
    @Watch('value', {immediate: true})
    public watchValue (val: any) {
      const address = {
        detail: '',
        area: '',
        areaObj: {
          provinceCode: '',
          provinceName: '',
          cityCode: '',
          cityName: '',
          countyCode: '',
          countyName: '',
        },
      }
      if (val) {
        if (val.detail) {
          address.detail = val.detail
        }
        if (val.area && val.area.length) {
          address.area = val.area
        }
        if (val.areaObj && val.areaObj.provinceCode) {
          address.areaObj = val.areaObj
        }
      }
      this.address = address
    }
    public getAreaObj = (areaList: any[]) => {
      let res = {
        provinceCode: '',
        provinceName: '',
        cityCode: '',
        cityName: '',
        countyCode: '',
        countyName: '',
      }
      if (areaList && areaList.length) {
        res.provinceCode = areaList[0]
        res.cityCode = areaList[1] || ''
        res.countyCode = areaList[2] || ''
        const province = addressList.find((item: any) => item.value === areaList[0])
        res.provinceName = province.label
        if (province.children && province.children.length) {
          const city = province.children.find((item: any) => item.value === areaList[1])
          res.cityName = city.label
          if (city.children && city.children.length) {
            const county = city.children.find((item: any) => item.value === areaList[2])
            res.countyName = county.label
          }
        }
      }
      return res
    }
    public created () {
      console.log(this.address, '组件内：created')
    }
    public changeSelect (val: any) {
      this.address.areaObj = this.getAreaObj(val)
      this.$emit('input', this.address)
      this.$emit('change', this.address)
    }
    public changeInput (val: any) {
      this.$emit('input', this.address)
      this.$emit('change', this.address)
    }
    public filterMethod (node: any, keyword: any) {
      return node.data.label.includes(keyword)
        || node.data.pinyinNormal.some((item: any) => item.includes(keyword))
        || node.data.pinyinFirstLetter.some((item: any) => item.includes(keyword))
    }
  }
</script>
<style lang="less" scoped>
</style>
