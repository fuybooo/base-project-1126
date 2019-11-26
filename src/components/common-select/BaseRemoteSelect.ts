import Vue, { VNodeChildren } from 'vue'
import { filterMethod, getConfig, getParams, getUrl, remoteMethod } from '@/components/common-select/remote.plugin'
import { HttpRes } from '@/models/common/models'
import pinyin from 'pinyin'
import { composeList } from '@/util/common/fns/fns-array'

/* 暂时没被使用【2019-11-20】 */
Vue.component('BaseRemoteSelect', {
  render (createElement) {
    const props = {
      filterable: true,
      clearable: true,
      remote: !this.searchAll,
      value: this.value,
      placeholder: '请输入关键词',
      'reserve-keyword': true,
      'value-key': 'id',
      'default-first-option': true,
      'remote-method': remoteMethod.bind(this),
      'filter-method': filterMethod.bind(this),
      ...this.props,
    }
    const me = this
    return createElement('el-select', {
      ref: 'remoteSelect',
      class: 'base-remote-select',
      props,
      ...this.nodeAttr,
      on: {
        change (val: any) {
          // @ts-ignore
          me.$emit('change', val)
          me.$emit('input', val)
        },
      },
    }, createOptions.bind(this)(createElement))
  },
  created () {
    // 进行查询
    if (this.searchDefault) {
      // @ts-ignore
      this.search()
    }
  },
  methods: {
    search (query?: string) {
      this.$req(getUrl.bind(this)(), getParams.bind(this)(query)).then((res: HttpRes) => {
        if (res.code === 200) {
          const config = getConfig.bind(this)()
          // @ts-ignore
          this.options = this.originList = this.searchAll ? res.data.results.map(item => ({
            ...item,
            pinyinNormal: composeList(pinyin(item[config.labelKey || this.labelKey], {
              style: pinyin.STYLE_NORMAL,
              heteronym: true,
            })),
            pinyinFirstLetter: composeList(pinyin(item[config.labelKey || this.labelKey], {
              style: pinyin.STYLE_FIRST_LETTER,
              heteronym: true,
            })),
          })) : res.data.results
          if (this.afterSearch) {
            this.afterSearch(res.data.results)
          }
        }
      })
    },
  },
  data () {
    return {
      originList: [],
      options: [],
    }
  },
  props: {
    // 查询框类型
    type: {
      type: String,
      default: '',
    },
    value: [ Array, Object, String, Number, Boolean ],
    props: Object,
    nodeAttr: Object,
    labelKey: {
      type: String,
      default: 'name',
    },
    valueKey: {
      type: String,
      default: 'id',
    },
    objValue: {
      type: Boolean,
      default: false,
    },
    searchAll: {
      type: Boolean,
      default: true,
    },
    searchKey: {
      type: String,
      default: 'name',
    },
    url: {
      type: [ Object, String ],
    },
    fixedParams: {
      type: Object,
      default () {
        return {}
      },
    },
    pageSize: {
      type: [ String, Number ],
      default: 50,
    },
    searchDefault: {
      type: Boolean,
      default: true,
    },
    afterSearch: Function,
    labelFormatter: Function,
    searchSingleUrl: {
      type: [ Object, String ],
    },
    searchSingleFixedParams: {
      type: Object,
      default () {
        return {}
      },
    },
  },
})

function createOptions (createElement: typeof Vue.prototype.$CreateElement): VNodeChildren {
  // @ts-ignore
  const me = this
  const config = getConfig.bind(me)()
  return me.options.map((item: any) => {
    return createElement('el-option', {
      props: {
        key: item[me.valueKey],
        label: me.labelFormatter ? me.labelFormatter(item) : (config.labelFormatter ? config.labelFormatter(item) : item[config.labelKey || me.labelKey]),
        value: me.objValue ? item : item[me.valueKey],
      },
    })
  })
}
