import Vue, { VNodeChildren } from 'vue'
import { Column, ContentType, defaultFilterSplit } from '@/components/common-table/table.model'
import { debounce, deepClone, deepTrim, guid } from '@/util/common/fns/fns'
import { getClientHeight, getSpaceHeight } from '@/util/common/fns/fns-dom'
import { setProperty } from '@/util/common/fns/fns-common'
import './BaseTable.less'
import { HttpRes, UUID_KEY } from '@/models/common/models'
import config from '@/config/base-config'

Vue.component('BaseTable', {
  render (createElement: typeof Vue.prototype.$CreateElement) {
    const defaultNodeAttrs = {
      ref: 'table',
      class: 'base-table',
    }
    const nodeAttrs = {
      ...defaultNodeAttrs,
      ...this.nodeAttrs,
      ref: defaultNodeAttrs.ref, // ref无法被覆盖
      class: (this.nodeAttrs.class || '') + ' ' + defaultNodeAttrs.class, // class 必须保持默认class名
    }
    // getHeight.bind(this)()
    const defaultTableProps = {
      data: [],
      border: true,
      size: 'mini',
      // @ts-ignore
      height: this.localHeight,
    }
    const tableProps = {
      ...defaultTableProps,
      ...this.tableProps,
      // @ts-ignore
      ...(this.remoteData.length === 0 ? {} : { data: this.remoteData }),
      ...mergeTableFunctionProps.bind(this)(),
      // @ts-ignore
      key: guid(),
    }
    const me = this
    return createElement('div', {
      class: 'base-table-wrap',
      ref: 'baseTableWrap',
    }, [ createElement('el-table', {
      props: tableProps,
      ...nodeAttrs,
      // todo 暂时只支持覆盖事件，需要改为既支持自定义事件，又支持通用事件，还支持可配置是否完全覆盖的参数
      on: {
        ...getTableEvent.bind(this)(),
      },
      directives: [
        {
          name: 'loading',
          // @ts-ignore
          value: this.loading === '' ? this.innerLoading : this.loading,
        },
      ],
    }, createColumns.bind(this)(createElement)),
      // @ts-ignore
      ...(this.usePaddingContent && !this.simple ? [ createElement('div', { class: 'base-padding-content' }) ] : []),
      !this.simple && this.isPagination && tableProps.data.length ? createElement('el-pagination', {
        class: 'base-pagination',
        props: {
          pageSizes: [ 10, 20, 30, 50, 100 ],
          background: true,
          layout: 'total, sizes, prev, pager, next, jumper',
          // @ts-ignore
          currentPage: this.currentPage,
          // @ts-ignore
          pageSize: this.pageSize,
          // @ts-ignore
          total: this.total,
        },
        on: {
          'current-change' (currentPage: number) {
            // @ts-ignore
            me.currentPage = currentPage
            // @ts-ignore
            me.search()
          },
          'size-change' (pageSize: number) {
            // @ts-ignore
            me.pageSize = pageSize
            // @ts-ignore
            me.search()
          },
        },
      }) : null ])
  },
  created () {
    if (this.recordParams && !this.simple) {
      // 根据url页码初始化分页参数
      // @ts-ignore
      const params = JSON.parse(this.$route.query[this.queryKey] || '{}')
      this.currentPage = params.currentPage || 1
      this.pageSize = params.pageSize || 20
      // 给过滤项赋值
      // @ts-ignore
      const filteredPropList = this.columns.filter((col: Column) => col.props && col.props.filters).map((col: Column) => col.filterProp || col.prop)
      filteredPropList.forEach((item: string) => {
        if (params[item] !== undefined) {
          // @ts-ignore
          setProperty(this.columns, item, { props: { filteredValue: params[item].split(',').map(v => v + (this.filterSplit || defaultFilterSplit) + item) } })
          this.$emit('update:columns', this.columns)
        }
      })
      // 给表单赋值
      // @ts-ignore
      this.$emit('update:params', { ...this.params, ...params })
      // 展示选中的行
      this.rememberRow = params._rememberRow
      this.rememberRowKey = params._rememberRowKey
    } else {
      this.$emit('update:params', { ...this.params, [UUID_KEY]: guid() })
    }
    if ((this.autoHeight || this.fixedElements || this.fixedHeight) && !this.simple) {
      // 添加监听事件
      window.addEventListener('resize', this.resize)
      setTimeout(() => {
        this.resize()
      }, 400)
    }
  },
  destroyed () {
    // 组件销毁时必须移除监听
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    search: debounce(function (first = false) {
      // @ts-ignore
      const me = this
      if (!me.url) {
        return
      }
      if (!(me.beforeList ? me.beforeList() : true)) {
        return
      }
      if (first) {
        me.currentPage = 1
      }
      me.innerLoading = true
      let params = getParams.bind(me)()
      // 更改浏览器参数
      if (me.recordParams && !me.simple) {
        changeRouteParams.bind(me)()
      }
      // 根据不同项目，获取不同的参数，不影响base-table的原有逻辑
      params = getParamsByProject(params)
      // 分页 防抖 滚动加载
      me.$req(me.url, params, me.useCache, me.method, me.axiosInst).then((res: HttpRes) => {
        if (res.code === 200) {
          // 改变remoteData之后会自动执行render
          me.innerLoading = false
          let result: any
          if (me.handleResult) {
            // 需要处理数据拦截，则处理，若处理会返回结果，则使用新的结果作为显示结果
            result = me.handleResult(res)
          }
          if (result === undefined) {
            me.remoteData = res.data[me.resultKey]
          } else {
            me.remoteData = result
          }
          me.total = me.handleTotal ? me.handleTotal(res.data || res) : res.data.total
          me.$emit('after-search', res)
        }
      })
    }, 300),
    resize () {
      debounce(calcHeight.bind(this), 100)()
    },
  },
  watch: {
    params: {
      handler () {
        this.search(!this.isFirstSearch)
        this.isFirstSearch = !this.isFirstSearch
      },
      deep: true,
    },
  },
  data () {
    return {
      remoteData: [],
      innerLoading: false,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      sortField: '',
      sortOrder: '',
      localHeight: null,
      filterMap: {},
      filterParams: {},
      isFirstSearch: true, // 第一进入页面时根据浏览器地址栏上的分页参数查询，之后改变条件时都会从第页开始查询
      rememberRow: '', // 要记住的行的值
      rememberRowKey: '', // 要记住的行的key
      rememberRowStatus: true, // 初次为true，点击行之后变为false
      key: guid(),
    }
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    url: {
      type: [ Object, String ],
    },
    params: {
      type: Object,
      default () {
        return {}
      },
    },
    loading: {
      type: [ Boolean, String ],
      default: '',
    },
    isPagination: {
      type: Boolean,
      default: true,
    },
    autoSearch: {
      type: Boolean,
      default: true,
    },
    // 自动计算表格高度
    autoHeight: {
      type: Boolean,
      default: true,
    },
    // 自动计算表格高度时需要排除的元素
    fixedElements: {
      type: String,
      default: '',
    },
    // 自动计算高度时需要排除的高度
    fixedHeight: {
      type: Number,
      default: 0,
    },
    /**
     * 在地址栏记录查询参数
     */
    recordParams: {
      type: Boolean,
      default: false,
    },
    // 是否记录行，点击详情离开界面之后，返回来时能够记住离开时点击的行
    recordRow: {
      type: Boolean,
      default: true,
    },
    queryKey: {
      type: String,
      default: 'q',
    },
    // 用于配置该表格的过滤器分割符（仅在极特殊时配置）
    filterSplit: {
      type: String,
      default: defaultFilterSplit,
    },
    resultKey: {
      type: String,
      default: 'results',
    },
    nodeAttrs: {
      type: Object,
      default () {
        return {}
      },
    },
    tableProps: {
      type: Object,
      default () {
        return {}
      },
    },
    // 当后端返回的数据需要前端进行处理时，可以使用该函数
    handleResult: Function,
    handleTotal: Function,
    // 查询之前可以根据该函数进行拦截处理
    beforeList: Function,
    // 自动生成计算表格高度时，是否需要计算一个空白边距（解决问题：当表格中出现fixed列，切数据行数较少，且表格总高度较高时，出现的一个样式比较难看的问题）
    // 注意：如果使用嵌套表格，则内部表格需要将此参数设置为false 或者 simple 设置为true
    usePaddingContent: {
      type: Boolean,
      default: false,
    },
    // 表格是否为简单表格
    // 简单表格：
    // 1. 不分页
    // 2. 不记录url
    // 3. 不自动计算高度
    // 4. 不自动生成paddingContent
    simple: {
      type: Boolean,
      default: false,
    },
    useCache: {
      type: Boolean,
      default: false,
    },
    method: {
      type: String,
      default: 'post',
    },
    axiosInst: {
      type: Function,
    }
  },
})

function createColumns (createElement: typeof Vue.prototype.$CreateElement): VNodeChildren {
  // @ts-ignore
  const me = this
  let columns: VNodeChildren
  columns = me.columns.map((col: Column) => {
    if (col.content) {
      return createElement('el-table-column', {
        props: getColumnProps.bind(me)(col),
        scopedSlots: {
          // @ts-ignore
          default: (props: any) => createElement('span', getContent.bind(me)(createElement, col, props)),
          // @ts-ignore
          ...(col.headerSlot ? { header: (props: any) => createElement('span', me.$scopedSlots[col.headerSlot]({ ...props })) } : {}),
        },
      })
    } else if (col.headerSlot || col.contentSlot) {
      return createElement('el-table-column', {
        props: getColumnProps.bind(me)(col),
        scopedSlots: {
          // @ts-ignore
          ...(col.contentSlot ? { default: (props: any) => createElement('span', me.$scopedSlots[col.contentSlot]({ ...props })) } : {}),
          // @ts-ignore
          ...(col.headerSlot ? { header: (props: any) => createElement('span', me.$scopedSlots[col.headerSlot]({ ...props })) } : {}),
        },
      })
    } else if (col.prop) {
      if (col.props && col.props.type === 'expand') {
        return createElement('el-table-column', {
          props: getColumnProps.bind(me)(col),
          scopedSlots: {
            default: (props: any) => createElement('div', me.$scopedSlots.expand({ ...props })),
          },
        })
      }
      return createElement('el-table-column', {
        props: getColumnProps.bind(me)(col),
      })
    }
  })
  return columns
}

function getColumnProps (col: Column) {
  const defaultColumnProps = {
    prop: col.prop,
    label: col.label,
    align: 'center',
    headerAlign: 'center',
  }
  return {
    ...defaultColumnProps,
    ...(col.props || {}),
  }
}

// el-table绑定的事件
function getTableEvent () {
  // @ts-ignore
  const me = this
  const onEvent = (me.nodeAttrs || {}).on || {}
  return {
    ...onEvent,
    'row-click' (row: any, column: any, event: any) {
      me.rememberRowStatus = false
      // tslint:disable-next-line:no-unused-expression
      onEvent['row-click'] && onEvent['row-click']({ row, column, event })
    },
    'sort-change' () {
      // todo 若排序需要支持同时按多个字段排序则需要增加逻辑
      const { prop, order } = arguments[0]
      me.sortField = prop
      me.sortOrder = order
      me.search(true)
      // tslint:disable-next-line:no-unused-expression
      onEvent['sort-change'] && onEvent['sort-change']()
    },
    'filter-change' () {
      // @ts-ignore
      const filterKey: string = Object.keys(arguments[0])[0]
      // @ts-ignore
      const filterValueList: string[] = Object.values(arguments[0])[0]
      if (filterValueList.length) {
        me.filterMap[filterKey] = {
          prop: filterValueList[0].split(me.filterSplit)[1],
          value: filterValueList.map(item => item.split(me.filterSplit)[0]),
        }
      } else {
        me.filterMap[filterKey] = {
          prop: '',
          value: [],
        }
      }
      me.filterParams = {}
      Object.keys(me.filterMap).forEach(key => {
        if (me.filterMap[key].prop) {
          me.filterParams[me.filterMap[key].prop] = me.filterMap[key].value.join()
        }
      })
      me.search(true)
      // tslint:disable-next-line:no-unused-expression
      onEvent['filter-change'] && onEvent['filter-change']()
    },
  }
}

// 表格高度
function getHeight () {
  // @ts-ignore
  const me = this
  // if (me.autoHeight || me.fixedElements || me.fixedHeight) {
  //   // 计算表格高度
  //   calcHeight.bind(me)()
  //   return me.localHeight
  // } else {
  //   return null
  // }
  if ((me.autoHeight || me.fixedElements || me.fixedHeight) && !me.simple) {
    // 计算表格高度
    calcHeight.bind(me)()
  } else {
    me.localHeight = null
  }
}

// 表格高度
function calcHeight () {
  // @ts-ignore
  const me = this
  const headerHeight = getClientHeight('#main-header')
  const paginationHeight = !me.simple && me.isPagination && ({
    data: [],
    ...me.tableProps,
    ...(me.remoteData.length === 0 ? {} : { data: me.remoteData }),
  }).data.length ? 32 : 0
  const wrapperHeight = getSpaceHeight('.main-content-wrap')
  const innerPaddingHeight = getSpaceHeight('.common-search-page > .page-main')
  const pageHeaderHeight = getClientHeight('.common-el-page-padding.el-page-header')
  const tableSpaceHeight = getSpaceHeight('.base-table')
  const btnBoxHeight = getClientHeight('.common-table-box .common-btn-box')
  const customHeight = 21 // 使得分页器与底部留适当距离
  // 计算fixed element的高度
  let fixedElementsHeight = 0
  if (me.fixedElements) {
    me.fixedElements.split(' ').forEach((selector: string) => {
      fixedElementsHeight += getClientHeight(selector)
    })
  }
  // 默认会排除的高度 这意味着 当查询条件使用 common-query 时无需传参数即可自动计算
  const defaultFixedElementHeight = getClientHeight('.common-query')
  // console.log('表格高度调试==========================开始==========================')
  // console.log(headerHeight, '头部高度')
  // console.log(wrapperHeight, '外部边距高度')
  // console.log(pageHeaderHeight, '翻页头部高度')
  // console.log(fixedElementsHeight, '额外高度')
  // console.log(innerPaddingHeight, '内部边距高度')
  // console.log(defaultFixedElementHeight, '查询区域高度')
  // console.log(tableSpaceHeight, '表格边距高度')
  // console.log(paginationHeight, '分页器高度')
  // console.log(me.fixedHeight, '固定高度')
  // console.log(customHeight, '自定义调整高度')
  // console.log(btnBoxHeight, '按钮区域高度')
  // console.log(window.innerHeight, '窗口高度')
  const localHeight = Math.max(config.MIN_WIN_HEIGHT, window.innerHeight)
    - headerHeight
    - paginationHeight
    - wrapperHeight
    - innerPaddingHeight
    - pageHeaderHeight
    - tableSpaceHeight
    - customHeight
    - me.fixedHeight
    - defaultFixedElementHeight
    - fixedElementsHeight
    - btnBoxHeight
  // console.log(me.localHeight, '表格最终高度')
  // console.log('表格高度调试==========================结束==========================')
  const tableContentElement = me.$refs.table.$el.querySelector('.el-table__body-wrapper > table.el-table__body')
  const paddingContentElement = me.$el.querySelector('.base-padding-content')
  const tableHeaderElement = me.$refs.table.$el.querySelector('.el-table__header-wrapper')
  if (tableContentElement && tableHeaderElement) {
    // console.log(tableHeaderElement.clientHeight, '表格头部高度')
    // console.log(tableContentElement.clientHeight, '表格内容高度')
    // console.log(localHeight, '计算出来的剩余空间高度')
    // 当出现滚动条时，判断是否将表格与分页器之间填充空白
    if (tableContentElement.clientHeight + tableHeaderElement.clientHeight + 1 <= localHeight) {
      // 设置content-padding部分的高度
      if (paddingContentElement && me.usePaddingContent) {
        me.localHeight = null
        paddingContentElement.style.height = (localHeight - (tableContentElement.clientHeight + tableHeaderElement.clientHeight + 1)) + 'px'
        // paddingContentElement.setAttribute('height', (localHeight - (tableContentElement.clientHeight + tableHeaderElement.clientHeight + 1)) + 'px')
        // console.log(paddingContentElement.style.height, '计算出来的空白部分高度')
      } else {
        me.localHeight = localHeight
      }
    } else {
      me.localHeight = localHeight
    }
  } else {
    me.localHeight = localHeight
  }
}

function getParams () {
  // @ts-ignore
  const me = this
  const params = deepClone(me.params)
  delete params[UUID_KEY]
  delete params._first
  // 循环删除筛选条件字段
  deleteFilterFields.bind(me)(params)
  return {
    ...params,
    currentPage: me.currentPage,
    pageSize: me.pageSize,
    sortField: me.sortField,
    sortOrder: me.sortOrder,
    ...me.filterParams,
  }
}

function changeRouteParams () {
  // @ts-ignore
  const me = this
  const params = getParams.bind(me)()
  const query = me.$route.query
  me.$router.replace({
    path: me.$route.path,
    query: {
      ...query,
      [me.queryKey]: JSON.stringify(deepTrim({
        ...params,
        ...(me.recordRow ? (me.rememberRow ? {
          _rememberRow: me.rememberRow,
          _rememberRowKey: me.rememberRowKey,
        } : {}) : {}),
      }, true)),
    },
  }).catch((err: any) => err)
}

function getContent (createElement: typeof Vue.prototype.$CreateElement, col: Column, props: any): VNodeChildren {
  // @ts-ignore
  const me = this
  let vNode: VNodeChildren = null
  // @ts-ignore
  const type: ContentType = col.content.type
  switch (type) {
    case 'link':
      // @ts-ignore
      if (!col.content.route) {
        throw Error('当type为link时，route为必须')
      }
      // @ts-ignore
      vNode = createElement('router-link', { props: { to: col.content.route(props.row) } }, [ createElement('a', { on: getContentEvent.bind(me)(type, col, props) }, [ col.content.value ? col.content.value(props.row) : props.row[col.prop] ]) ])
      break
    case 'btn':
      break
    case 'event':
      // @ts-ignore
      vNode = createElement('a', {
        on: getContentEvent.bind(me)(type, col, props),
        class: 'table-event-link',
        // @ts-ignore
      }, [ col.content.value ? col.content.value(props.row) : props.row[col.prop] ])
      break
  }
  return [ vNode ]
}

function getContentEvent (type: ContentType, col: Column, props: any) {
  // @ts-ignore
  const me = this
  const eventObj: any = {}
  switch (type) {
    case 'link':
      eventObj.click = () => {
        // todo 在跳转到其他页面之前需要添加的事情
        if (me.recordRow) {
          // @ts-ignore
          me.rememberRow = props.row[col.content.key || col.prop] + ''
          // @ts-ignore
          me.rememberRowKey = col.content.key || col.prop
        }
        if (me.recordParams) {
          changeRouteParams.bind(me)()
        }
      }
      break
    case 'event':
      eventObj.click = () => {
        // me.$emit('event', { ...props, event: col.content.event || 'view' }, col)
        // @ts-ignore
        me.$emit(col.content.event || 'view', props, col)
      }
      break
  }
  return eventObj
}

function mergeTableFunctionProps () {
  // @ts-ignore
  const me = this
  return {
    'row-class-name' (arg: any) {
      let outerRowClassName: any = me.tableProps['row-class-name'] || ''
      if (outerRowClassName) {
        if (typeof outerRowClassName === 'function') {
          outerRowClassName = outerRowClassName(arg)
        }
      }
      let innerRowClassName = ''
      if (me.rememberRowStatus && me.recordParams && me.recordRow && me.rememberRow && me.rememberRow === arg.row[me.rememberRowKey] + '') {
        innerRowClassName = 'remember-row'
      }
      return `${ outerRowClassName } ${ innerRowClassName }`
    },
  }
}

function deleteFilterFields (params: any) {
  // @ts-ignore
  const me = this
  // 找到哪些字段是筛选字段
  const filterCols = me.columns.filter((col: Column) => {
    if (col && col.props && col.props.filters) {
      return true
    }
  })
  // 循环删除
  for (const item of filterCols) {
    delete params[item.prop]
  }
}

function getParamsByProject (params: any) {
  const projectParams: any = {}
  for (const p in params) {
    if (params.hasOwnProperty(p)) {
      const value = params[p]
      if (p === 'currentPage') {
        projectParams.start = params.pageSize * (value - 1)
      } else if (p === 'pageSize') {
        projectParams.length = value
      } else {
        projectParams[p] = value
      }
    }
  }
  return projectParams
}
