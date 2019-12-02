<template>
  <div>
    <template v-if="pattern === 'view'">
      <span class="black-2">{{ localViewValue }}</span>
    </template>
    <!--    option 中的 key 最好不要使用 (item, index) in options 中的index作为key 否则，可能会出现难以控制的bug-->
    <!--    比如：出现bug，当搜索完成后，有时候出现搜索关键字被清空的bug-->
    <template v-else>
      <el-select
        :disabled="disabled"
        :filter-method="doFilterMethod"
        :loading="loading"
        :remote-method="doRemoteMethod"
        @change="changeValue"
        v-bind="localProps"
        v-model="localValue"
      >
        <el-option
          :key="item[optionValueKey]"
          :label="getLabel(item)"
          :value="getValue(item)"
          v-for="item in options"
        ></el-option>
      </el-select>
    </template>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { filterMethod, getConfig, getParams, getUrl } from './remote.plugin'
  import { HttpRes, Pattern } from '@/models/common/models'
  import { getPy } from '@/util/common/fns/fns'

  @Component({})
  export default class BaseRemoteSelect extends Vue {
    @Prop({ default () { return {} } })
    public props!: any
    @Prop({ default () { return '' }, type: [ Array, String, Number, Object ] })
    public value!: any
    @Prop({ default () { return {} } })
    public fixedParams!: any
    @Prop({ default () { return {} } })
    public searchSingleFixedParams!: any
    @Prop({ default () { return '' }, type: [ Object, String ] })
    public url!: any
    @Prop({ default () { return '' }, type: [ Object, String ] })
    public searchSingleUrl!: any
    @Prop({ default: 'create' })
    public pattern!: Pattern
    @Prop({ default: 50, type: Number })
    public pageSize!: any
    @Prop({ default: '', type: String })
    public type!: string
    @Prop({ default: '', type: String })
    public placeholder!: string
    @Prop({ default: 'name', type: String })
    public searchKey!: string
    @Prop({ default: 'name', type: String })
    public labelKey!: string
    @Prop({ default: 'id', type: String })
    public valueKey!: string
    @Prop({ type: Function })
    public filterMethod!: any
    @Prop({ type: Function })
    public remoteMethod!: any
    @Prop({ type: Function })
    public afterSearch!: any
    @Prop({ type: Function })
    public labelFormatter!: any
    @Prop({ default: false, type: Boolean })
    public disabled!: boolean
    @Prop({ default: true, type: Boolean })
    public searchAll!: boolean // 是否查询所有数据
    @Prop({ default: false, type: Boolean })
    public showAll!: boolean // 是否显示 "全部" 选项
    @Prop({ default: false, type: Boolean })
    public objValue!: boolean
    @Prop({ default: false, type: Boolean })
    public multiple!: boolean
    @Prop({ default: true, type: Boolean })
    public searchDefault!: boolean
    @Prop({ default: '' })
    public viewValue!: string // 当multiple为true时，viewValue不生效
    @Prop({ default: false, type: Boolean })
    public useCache!: boolean
    // 延迟发送请求，使用场景：在一个页面要显示多个相同的下拉框时，可以使用缓存实现，少发请求的效果
    @Prop({ default: 0, type: Number })
    public delay!: number
    public loading = false
    public localViewValue: any = this.viewValue
    public localValue: any = this.value
    public originList: any[] = []
    public options: any[] = []
    public valueLoaded = false
    public listLoaded = false
    public defaultProps = {
      filterable: true,
      clearable: true,
      remote: !this.searchAll,
      value: this.multiple ? this.value || [] : this.value,
      placeholder: this.placeholder || '请选择',
      multiple: this.multiple,
      'reserve-keyword': true,
      'value-key': 'id',
      'default-first-option': true,
    }

    public get localProps () {
      return {
        ...this.defaultProps,
        ...this.props,
      }
    }

    public get optionValueKey () {
      return getConfig.bind(this)().valueKey
    }

    public created () {
      if (this.searchDefault) {
        this.loading = true
        setTimeout(() => {
          this.search()
        }, this.delay)
      }
    }

    @Watch('value', { immediate: true })
    public watchValue (val: any) {
      this.localValue = val
      setTimeout(() => {
        this.valueLoaded = true
        // this.syncSetValue() // 回显数据
        if (!this.viewValue && this.pattern === 'view') {
          this.syncViewValue() // 回显 view 模式下的数据
        }
      })
    }

    @Watch('viewValue', { immediate: true })
    public watchViewValue (val: any) {
      this.localViewValue = val
    }

    public getLabel (item: any) {
      const config = getConfig.bind(this)()
      return this.labelFormatter ? this.labelFormatter(item) : (config.labelFormatter ? config.labelFormatter(item) : item[config.labelKey || this.labelKey])
    }

    public getValue (item: any) {
      return this.objValue ? item : item[this.valueKey]
    }

    public changeValue (val: any) {
      this.$emit('change', val)
      this.$emit('input', val)
    }

    public search (query?: string) {
      const url = getUrl.bind(this)()
      const params = getParams.bind(this)(query)
      this.$req(url, params, this.useCache).then((res: HttpRes) => {
        // if (this.useCache) {
        //   this.$store.commit(setCache, {
        //     url: reqGetUrl(url).url,
        //     params,
        //     result: res,
        //   })
        // }
        this.loading = false
        if (res.code === 200) {
          const config = getConfig.bind(this)()
          this.options = this.originList = config.handleOptions(this.searchAll ? res.data.results.map((item: any) => ({
            ...item,
            ...getPy(item[config.labelKey || this.labelKey]),
          })) : res.data.results)
          if (this.afterSearch) {
            this.afterSearch(res.data.results)
          }
          this.listLoaded = true
          // this.syncSetValue()
          if (!this.viewValue && this.pattern === 'view') {
            this.syncViewValue()
          }
        }
      })
    }

    // public syncSetValue () {
    //   if (this.multiple) {
    //     if (this.value && this.value.length) {
    //
    //     } else {
    //
    //     }
    //   }
    // }
    public syncViewValue () {
      if (this.valueLoaded && this.listLoaded) {
        const config = getConfig.bind(this)()
        if (this.multiple) {
          if (this.value && this.value.length) {
            const valueList = this.originList.filter(item => (this.value as any[]).some(v => v === item[config.valueKey]))
            if (valueList.length) {
              this.localViewValue = valueList.map(item => item[config.labelKey]).join('、')
            }
          }
        } else {
          const value = this.originList.find(item => item[config.valueKey] === (this.localValue[config.valueKey] ? this.localValue[config.valueKey] : this.localValue))
          if (value) {
            this.localViewValue = value[config.labelKey]
          }
        }
      }
    }

    public doFilterMethod (query: string) {
      if (this.filterMethod) {
        this.options = this.filterMethod(query, this.originList)
      } else {
        filterMethod.bind(this)(query)
      }
    }

    public doRemoteMethod (query: string) {

    }
  }
</script>
<style lang="less" scoped>
</style>
