import Vue, { VNodeChildren } from 'vue'
import { childrenCompMap, compMap, FormChangeEvent, Option, Schema } from '@/components/common-form/form.model'
import { debounce, deepClone, getProp, guid, setProp } from '@/util/common/fns/fns'
import {
  getLabelOfOption,
  getValueOfOption,
  isCheckbox,
  isDate,
  isDateRange,
  isSelect,
  setFormData,
  transferRule,
} from '@/util/common/fns/fns-form'
import format from 'date-fns/format'
import './BaseForm.less'
import { UUID_KEY } from '@/models/common/models'
import { getCalcLength } from '@shared/fns'

Vue.component('BaseForm', {
  render (createElement) {
    // el-form 的虚拟节点属性
    const defaultNodeAttrs = {
      ref: 'form',
      class: 'base-form',
    }
    const nodeAttrs = {
      ...defaultNodeAttrs,
      ...this.nodeAttrs,
      ref: defaultNodeAttrs.ref, // ref无法被覆盖
      class: (this.nodeAttrs.class || '') + ' ' + defaultNodeAttrs.class, // class 必须保持默认class名
    }
    // el-form的props属性
    const defaultFormProps = {
      size: 'small',
    }
    const formProps = {
      ...defaultFormProps,
      ...this.formProps,
      inline: this.inline,
      model: this.value,
      hideRequiredAsterisk: this.formPattern === 'view' || this.formProps.hideRequiredAsterisk,
    }
    // 遍历schema，找到label最大的schema，根据该值设置默认的宽度
    formProps.labelWidth = this.formProps.labelWidth || getDefaultLabelWidth.bind(this)()
    formProps.labelPosition = this.formProps.labelPosition || 'right'
    const formItems: VNodeChildren = createFormItems.bind(this)(createElement)
    if (this.showBtn) {
      if (this.inline && this.showSearchBtn) {
        // @ts-ignore
        formItems.push(createInlineBtnItem.bind(this)(createElement))
      }
      if (this.showCreateBtn) {
        // @ts-ignore
        formItems.push(createBtnItem.bind(this)(createElement))
      }
    }
    return createElement(
      'el-form',
      {
        props: formProps,
        ...nodeAttrs,
      },
      // @ts-ignore
      this.isRow ? [ createElement('el-row', {}, formItems) ] : formItems,
    )
  },
  methods: {},
  watch: {
    // 当其变更为true时说明赋值操作已经完成
    formChangeDone: {
      handler () {
        const me: any = this
        me.isEdited = false
        me.originValue = deepClone(me.value)
      },
    },
    value: {
      handler () {
        const me: any = this
        me.isEdited = true
      },
      deep: true,
    },
    $route: {
      handler (crtRoute) {
        const me = this
        debounce(() => {
          if (me.autoRouter) {
            me.$emit('update:formPattern', crtRoute.params.pattern)
          }
        }, 100)()
      },
      deep: true,
    },
  },
  data () {
    return {
      isEdited: false,
      originValue: null,
    }
  },
  props: {
    // 表单的结构
    schema: {
      type: Array,
      required: true,
    },
    // 表单的双向绑定值
    value: {
      type: Object,
    },
    // 是否为栅格化表单
    isRow: {
      type: Boolean,
      default: false,
    },
    span: {
      type: [ Number, String ],
      default: 24,
    },
    inline: {
      type: Boolean,
      default: true,
    },
    // 是否显示base-form自定义的按钮，若为true，则按钮事件也是默认的
    showBtn: {
      type: Boolean,
      default: true,
    },
    // 是否显示默认的查询和重置按钮
    showSearchBtn: {
      type: Boolean,
      default: true,
    },
    showResetBtn: {
      type: Boolean,
      default: false,
    },
    // 是否显示默认的创建
    showCreateBtn: {
      type: Boolean,
      default: false,
    },
    // 显示的按钮的一些属性
    btn: {
      type: Object,
      default () {
        return {
          class: '',
          type: '',
          text: '',
        }
      },
    },
    // el-form的props属性
    formProps: {
      type: Object,
      default () {
        return {}
      },
    },
    // el-form的attrs属性
    nodeAttrs: {
      type: Object,
      default () {
        return {}
      },
    },
    formPattern: {
      type: String,
    },
    // auto change route
    autoRouter: {
      type: Boolean,
      default: true,
    },
    // 表单是否已经赋值完成，用于控制哪些数据变更是赋值操作，哪些是用户操作
    formChangeDone: {
      type: Boolean,
      default: true,
    },
    // 当页面编辑时，填写了编辑内容后又点击了取消时的操作
    leaveEdited: {
      type: Function,
    },
    // 是否将当前页面的query参数当作来时的页面的参数使用
    isFromQuery: {
      type: Boolean,
      default: true,
    },
    // 当isFromQuery为false时，使用该值作为来时的参数
    fromQuery: {
      type: Object,
    },
  },
})

/**
 * 创建表单的所有项目
 * @param createElement
 */
function createFormItems (createElement: typeof Vue.prototype.$createElement): VNodeChildren {
  // @ts-ignore
  const me = this
  // 循环处理schema
  const schema: Schema[] = me.schema
  // todo 判断表单的模式 渲染成输入框或者文本
  // const formPattern: pattern = this.formPattern
  // @ts-ignore
  return schema.map(item => {
    let formItem
    // todo 处理slot方式的表单项
    formItem = createFormItem.bind(me)(createElement, item)
    return formItem
  })
}

/**
 * 根据单个Schema 创建表单的其中一项
 * @param createElement
 * @param item
 */
function createFormItem (createElement: typeof Vue.prototype.$createElement, item: Schema): VNodeChildren {
  // @ts-ignore
  const me = this
  let formControl: VNodeChildren
  if (item.prop) {
    if (item.comp === 'slot') {
      formControl = me.$slots[item.prop]
    } else {
      formControl = createFormControl.bind(me)(createElement, item)
    }
  } else {
    // 处理 prop 为空时的情况
  }
  let formItem: VNodeChildren
  const itemProps = item.formItemProps || {}
  formItem = createElement(
    'el-form-item',
    {
      props: {
        ...itemProps,
        prop: item.prop,
        label: item.label,
        ...(itemProps.rules ? { rules: transferRule.bind(me)(itemProps.rules) } : {}),
      },
      ...(item.formItemNodeProperty || {}),
      class: ((item.formItemNodeProperty || {}).class || '') + getClassName(item, 'base-form-item'),
    },
    [ formControl ], // 此处的参数必须为数组
  )
  return me.isRow ? createElement('el-col', { props: { span: + (item.span || me.span) } }, [ formItem ]) : formItem
  // return formItem
}

/**
 * 根据单个Schema 创建表单的控件
 * @param createElement
 * @param item
 */
function createFormControl (createElement: typeof Vue.prototype.$createElement, item: Schema): VNodeChildren {
  // @ts-ignore
  const me = this
  let formControl: VNodeChildren
  if (me.formPattern === 'view' || item.pattern === 'view') {
    formControl = createElement(item.viewComponent || 'base-view-html', {
      props: {
        ...item.props,
        formItem: item,
        // @ts-ignore
        value: getProp.bind(me.value)(item.prop),
      },
    })
  } else {
    // @ts-ignore
    const tag = compMap[item.comp || 'input'] || item.comp
    formControl = createElement(tag, {
      props: getFormControlProps.bind(me)(item),
      attrs: getFormControlAttrs.bind(me)(item),
      ...getElementDataObject.bind(me)(item),
    }, createFormControlVNodeChildren.bind(me)(createElement, item))
  }
  return formControl
}

/**
 * 根据单个Schema 创建表单控件的子元素，目前只支持 select radio checkbox
 * @param createElement
 * @param item
 */
function createFormControlVNodeChildren (createElement: typeof Vue.prototype.$createElement, item: Schema): VNodeChildren {
  // @ts-ignore
  const me = this
  let vNodeChildren: VNodeChildren
  // @ts-ignore
  const tag = childrenCompMap[item.comp || 'input']
  // 目前只支持 select radio checkbox 2019-06-25
  if (tag && me.formPattern !== 'view') {
    vNodeChildren = ((item.props || {}).options || []).map((option: Option) => createElement(tag, {
      props: {
        key: getValueOfOption(option, item),
        // 注意： el-checkbox 和el-radio将label属性作为其绑定值
        label: isSelect(item) ? getLabelOfOption(option, item) : getValueOfOption(option, item),
        // value: getValueOfOption(option, item),
        ...(isSelect(item) ? { value: getValueOfOption(option, item) } : {}),
      },
      on: {
        change (val: any) {
          onChildrenChange.bind(me)(val, tag, item, option)
        },
      },
    }, isSelect(item) ? null : getLabelOfOption(option, item)))
  } else {
    vNodeChildren = []
  }
  return vNodeChildren
}

/**
 * 根据单个Schema 获取当前表单控件的props属性
 * @param item
 */
function getFormControlProps (item: Schema) {
  // @ts-ignore
  const me = this
  return {
    value: item.prop ? getProp.bind(me.value)(item.prop) : '',
    ...getDefaultProps.bind(me)(item),
    ...(item.props || {}),
  }
}

/**
 * 根据单个Schema 获取当前表单控件的attrs属性
 * @param item
 */
function getFormControlAttrs (item: Schema) {
  const attrs: any = (item.nodeProperty || {}).attrs || {}
  if (!item.comp || item.comp === 'input' || item.comp === 'select') {
    attrs.placeholder = item.placeholder || attrs.placeholder || ((item.comp === 'select' ? '请选择' : '请输入') + (item.label || ''))
  }
  return attrs
}

// 设置控件的默认属性
function getDefaultProps (item: Schema) {
  const defaultProps: any = {}
  if (!item.comp || item.comp === 'input' || item.comp === 'select') {
    defaultProps.clearable = true
    if (item.comp === 'select') {
      defaultProps.filterable = true
    }
  } else if (item.comp === 'date') {
    const props = item.props || {}
    if (props.type.includes('range')) {
      defaultProps['start-placeholder'] = '开始'
      defaultProps['end-placeholder'] = '结束'
    } else {
      defaultProps.placeholder = props.placeholder || item.label
    }
  } else if (item.comp === 'number') {
    defaultProps['controls-position'] = 'right'
  }
  return defaultProps
}

/**
 * 根据单个Schema 获取虚拟DOM数据属性
 * @param item
 */
function getElementDataObject (item: Schema) {
  // @ts-ignore
  const me = this
  const properties = item.nodeProperty || {}
  return {
    class: (properties.class || '') + getClassName(item),
    ref: properties.ref,
    refInFor: true,
    ...properties,
    on: {
      input (val: any) {
        onInput.bind(me)(val, item)
      },
      change (val: any) {
        onChange.bind(me)(val, item)
      },
      ...properties.on,
    },
  }
}

// 给控件绑定输入事件
function onInput (val: any, item: Schema) {
  // @ts-ignore
  const me = this
  // todo 判断输入框的类型
  if (!isCheckbox(item)) {
    setProp.bind(me.value)(item.prop, val)
    setExtraValue.bind(me)(item, val)
  }
  const changeEvent: FormChangeEvent = {
    type: 'input',
    item,
    value: val,
  }
  me.$emit('change', changeEvent)
}

function onChange (val: any, item: Schema) {
  // @ts-ignore
  const me = this
  const changeEvent: FormChangeEvent = {
    type: 'change',
    item,
    value: val,
  }
  me.$emit('change', changeEvent)
}

// 给控件的子元素绑定change事件
function onChildrenChange (val: any, tag: string, item: Schema, option: Option) {
  // @ts-ignore
  const me = this
  if (isCheckbox(item)) {
    // @ts-ignore
    let options = me.value[item.prop] || item.initValue || []
    const allOptions = item.props.options
    const crtOption = allOptions.find((o: Option) => getValueOfOption(o, item) === getValueOfOption(option, item))
    if (val) {
      if (!options.includes(getValueOfOption(crtOption, item))) {
        options.push(getValueOfOption(crtOption, item))
      }
    } else {
      options = options.filter((o: string | number) => o !== getValueOfOption(crtOption, item))
    }
    const changeEvent: FormChangeEvent = {
      type: 'childChange',
      item,
      value: val,
      option,
    }
    me.$emit('change', changeEvent)
    setProp.bind(me.value)(item.prop, options)
  }
}

// input时 设置表单额外的属性
function setExtraValue (item: Schema, val: any) {
  // @ts-ignore
  const me = this
  if (isDateRange(item)) {
    if (item.startProp && item.endProp) {
      const startDate = new Date(val[0])
      const endDate = new Date(val[1])
      // 设置默认的日期文本
      let start: string = format(startDate, 'yyyy-MM-dd')
      let end: string = format(endDate, 'yyyy-MM-dd')
      if (item.props.type === 'datetimerange') {
        start = format(startDate, 'yyyy-MM-dd HH:mm:ss')
        end = format(endDate, 'yyyy-MM-dd HH:mm:ss')
      } else if (item.props.type === 'monthrange') {
        start = format(startDate, 'yyyy-MM')
        end = format(endDate, 'yyyy-MM')
      }
      setProp.bind(me.value)(item.startProp, val.length === 2 ? start : '')
      setProp.bind(me.value)(item.endProp, val.length === 2 ? end : '')
    }
  } else if (isDate(item)) {
    let date: string = format(new Date(val), 'yyyy-MM-dd')
    if (item.props.type === 'year') {
      date = format(new Date(val), 'yyyy')
    } else if (item.props.type === 'month') {
      date = format(new Date(val), 'yyyy-MM')
    } else if (item.props.type === 'datetime') {
      date = format(new Date(val), 'yyyy-MM-dd HH:mm:ss')
    } else if (item.props.type === 'dates') {
      date = (val || []).map((d: string) => format(new Date(d), 'yyyy-MM-dd'))
    } else if (item.props.type === 'week') {
      date = val
    }
    if (item.aliasProp) {
      setProp.bind(me.value)(item.aliasProp, date)
    }
  }
}

function createInlineBtnItem (createElement: typeof Vue.prototype.$createElement) {
  // @ts-ignore
  const me = this
  return me.$slots.searchBtn || createElement('el-form-item', {
    class: 'fr',
  }, [
    createElement('el-button', {
      props: {
        type: 'border',
        size: 'large',
      },
      nativeOn: {
        click () {
          me.$emit('search')
          setProp.bind(me.value)(UUID_KEY, guid())
        },
      },
    }, '查询'),
    me.showResetBtn ?
      createElement('el-button', {
        nativeOn: {
          click () {
            me.$refs.form.resetFields()
            setFormData(me.value, {}, true)
            setProp.bind(me.value)(UUID_KEY, guid())
            me.$emit('reset')
          },
        },
      }, '重置') : null,
  ])
}

function createBtnItem (createElement: typeof Vue.prototype.$createElement) {
  // @ts-ignore
  const me: any = this
  if (me.$slots.default) {
    return me.$slots.default
  }
  const btnFormItem = createElement('el-form-item', { class: me.btn.class || (me.inline ? 'fr mr0i' : '') }, [ createElement('el-button', {
    props: {
      type: me.btn.type || 'primary',
    },
    // 绑定确定事件
    nativeOn: {
      click () {
        // 从编辑切换为显示状态 默认行为
        if (me.formPattern === 'view') {
          if (me.autoRouter) {
            me.$router.replace({
              name: me.$route.name,
              params: { ...(me.$route.params || {}), pattern: 'edit' },
            })
          }
          // 刚刚点击编辑，用户还来不及对数据进行修改，所以此时表单应该是未编辑状态
          me.isEdited = false
          me.$emit('update:formPattern', 'edit')
        } else {
          me.$emit(me.inline ? 'create' : me.formPattern === 'view' ? 'edit' : 'submit')
        }
      },
    },
  }, [ me.btn.text || (me.inline ? '创建' : me.formPattern === 'view' ? '编辑' : '保存') ]), ...(me.inline ? [] : (me.formPattern === 'view' ? [] : [ createElement('el-button', {
    // 绑定取消事件
    nativeOn: {
      click () {
        if (me.formPattern === 'edit') {
          // 如果页面被编辑过，则进行询问
          if (me.isEdited) {
            confirmLeave.bind(me)().then(() => {
              if (me.leaveEdited) {
                me.leaveEdited()
              } else {
                // defaultLeaveEdited.bind(me)()
                goBack.bind(me)()
              }
            }).catch(() => {
            })
          } else {
            // leaveEdit.bind(me)()
            goBack.bind(me)()
          }
        } else if (me.formPattern === 'create') {
          if (me.isEdited) {
            confirmLeave.bind(me)().then(() => {
              goBack.bind(me)()
            }).catch(() => {
            })
          } else {
            me.isEdited = false
            goBack.bind(me)()
          }
        } else if (me.formPattern === 'view') {
          // 直接返回
          goBack.bind(me)()
          me.isEdited = false
        }
      },
    },
  }, me.formPattern === 'view' ? '返回' : '取消') ])) ])
  return me.isRow ? [ createElement('el-col', {}, [ btnFormItem ]) ] : btnFormItem
}

function getFormControlClassType (item: Schema) {
  let type = ''
  let fixedHeight = false
  if (!item.comp || item.comp === 'input') {
    type = 'input'
    if (item.props) {
      if (item.props.type === 'textarea') {
        type = 'textarea'
        fixedHeight = true
      }
    }
  } else if (item.comp === 'select') {
    type = 'select'
    if (item.props) {
      if (item.props.multiple) {
        type = 'select-multiple'
        fixedHeight = true
      }
    }
  } else if (item.comp === 'date') {
    type = 'date'
  } else if (item.comp === 'transfer') {
    fixedHeight = true
  } else if (item.comp === 'radio') {
    fixedHeight = true
  } else if (item.comp === 'upload') {
    fixedHeight = true
  }
  return {
    type: type || item.comp,
    fixedHeight,
  }
}

function getClassName (item: Schema, prefix = 'base-form-control') {
  const classType = getFormControlClassType(item)
  return ` ${ prefix } ${ item.prop ? (prefix + '-' + item.prop) : '' } ${ prefix }-${ classType.type }${ classType.fixedHeight ? ` ${ prefix }-fixed-height` : '' }`
}

function confirmLeave () {
  // @ts-ignore
  const me = this
  return me.$confirm('离开页面将会丢失未保存的数据，请确认是否离开', '确认提示')
}

function leaveEdit () {
  // @ts-ignore
  const me = this
  if (me.autoRouter) {
    me.$router.replace({
      name: me.$route.name,
      params: { ...(me.$route.params || {}), pattern: 'view' },
    })
    me.$emit('update:formPattern', 'view')
  }
  me.$emit('cancel', 'edit')
  me.isEdited = false
}

// 该方法中originValue的值来源于 formChangeDone 属性的设置
function defaultLeaveEdited () {
  // @ts-ignore
  const me = this
  setFormData(me.value, me.originValue)
  me.$emit('update:formPattern', 'view')
  // 取消编辑，发送事件之后，在外部进行跳转逻辑，并且重新给form赋值
  me.$emit('cancel', 'edited')
}

function goBack () {
  // @ts-ignore
  const me = this
  me.$router.push({ name: me.$route.meta.parentName, query: (me.isFromQuery ? me.$route.query : me.fromQuery) })
  // me.$router.back()
}

function getDefaultLabelWidth () {
  // @ts-ignore
  const me = this
  const max = me.schema.map((item: Schema) => getCalcLength((item.label || ''))).sort((a: number, b: number) => a - b)[me.schema.length - 1]
  if (max <= 4) {
    return '90px'
  } else if (max <= 5) {
    return '100px'
  } else if (max <= 6) {
    return '110px'
  } else if (max <= 7) {
    return '125px'
  } else if (max <= 8) {
    return '140px'
  } else {
    return '200px'
  }
}
