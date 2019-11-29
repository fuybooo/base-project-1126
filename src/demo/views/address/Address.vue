<template>
  <div class="demo-page">
    <h2>地址 demo</h2>
    <h3>1. 常规用法</h3>
    <div class="demo-box">
      <div class="demo-line">
        <p>使用场景：只是测试用的示例，很少会单独用</p>
        <base-address v-model="address" @change="changeAddress"></base-address>
      </div>
    </div>
    <h3>2. 表单用法</h3>
    <div class="demo-box">
      <div class="demo-line">
        <p>使用场景：在表单中使用 回显</p>
        <p class="black-4">特点：赋值时，必须按照组件接收的格式赋值</p>
        <base-form
          ref="form"
          :inline="false"
          :schema="schema"
          is-row
          v-model="form">
        </base-form>
        <div class="demo-btn-box">
          <el-button @click="switchStatus">切换禁用</el-button>
          <el-button @click="submitForm">提交</el-button>
        </div>
      </div>
      <div class="demo-line">
        <p>使用场景：在表单中使用 显示模式</p>
        <p class="black-4">特点： pattern = view</p>
        <base-form
          :inline="false"
          :schema="schema2"
          is-row
          v-model="form2">
        </base-form>
      </div>
    </div>
    <div class="h500"></div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Schema } from '@/components/common-form/form.model'
  import { fb, requiredRuleProp } from '@/util/common/fns/fns-form'
  import { formatAddress, addressRequiredRuleProp } from '@/components/common-address/address.model';
  import { setProperty } from '@/util/common/fns/fns-common'
  import { getProp } from '@/util/common/fns/fns'

  @Component({})
  export default class Address extends Vue {
    public address = {}
    public schema: Schema[] = [
      {
        prop: 'address',
        label: '地址',
        comp: 'base-address',
        props: {
          disabled: false,
        },
        ...addressRequiredRuleProp,
      }
    ]
    public schema2: Schema[] = [
      {
        prop: 'address',
        label: '地址',
        comp: 'base-address',
        viewFilter (value: any) {
          return formatAddress(value)
        },
        pattern: 'view',
      }
    ]
    public form = fb(this.schema)
    public form2 = fb(this.schema2)
    public created () {
      // 假设从后端获取的数据是
      const res = {
        detail: '天裕欣园东区7号楼4单元502室',
        cityCode: '130400',
        cityName: '邯郸市',
        countyCode: '130404',
        countyName: '复兴区',
        provinceCode: '130000',
        provinceName: '河北省',
      }
      const detail = res.detail
      delete res.detail
      // 回显
      this.form.address = {
        detail,
        area: [res.provinceCode, res.cityCode, res.countyCode],
        areaObj: res,
      }
      // 显示模式
      this.form2.address = {
        detail,
        area: [res.provinceCode, res.cityCode, res.countyCode],
        areaObj: res,
      }
    }
    public changeAddress (val: any) {
      console.log(val, '改变地址之后')
    }
    public switchStatus () {
      const status = this.schema[0].props.disabled
      setProperty(this.schema, 'address', {
        props: {
          disabled: !status
        }
      })
    }
    public submitForm () {
      (this.$refs.form as any).$refs.form.validate((valid: boolean) => {
        if (valid) {
          this.$success('提交成功')
        }
      })
    }
  }
</script>
<style lang="less" scoped>

</style>
