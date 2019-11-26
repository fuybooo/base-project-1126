export declare type ContentType = 'link' | 'event' | 'btn'

export interface Column {
  prop?: string // 唯一属性标志 当前列的属性值
  label?: string // 当前列的表头
  props?: ColumnProps // 参考element 表格属性列表
  headerSlot?: string // 自定义表头
  contentSlot?: string // 自定义内容
  // 用于过滤的字段名
  filterProp?: string
  // 控制显示内容【优先级最高】
  content?: {
    type: ContentType,
    key?: string, // 默认为 id
    event?: string, // type 为 event时，该属性默认值为view
    route? (row: any): string, // 路由 当type为link时 route 为必须
    value? (row: any): string | number, // 当传该值时，优先用该值渲染，否则用当前列当值渲染
  }
}

// baseTable中tableProps
export interface TableProps {
  data?: [],
  size?: string,
  width?: string | number,
  height?: string | number,
  maxHeight?: string | number,
  fit?: boolean,
  stripe?: boolean,
  border?: boolean,
  rowKey?: string | number,
  context?: any,
  showHeader?: boolean,
  showSummary?: boolean,
  sumText?: string,
  summaryMethod?: any,
  rowClassName?: string | any,
  rowStyle?: any,
  cellClassName?: string | any,
  cellStyle?: any,
  headerRowClassName?: string | any,
  headerRowStyle?: any,
  headerCellClassName?: string | any,
  headerCellStyle?: any,
  highlightCurrentRow?: boolean,
  currentRowKey?: string | number,
  emptyText?: string,
  expandRowKeys?: any[],
  defaultExpandAll?: boolean,
  defaultSort?: any,
  tooltipEffect?: string,
  spanMethod?: any,
  selectOnIndeterminate?: boolean,
  indent?: number,
  treeProps?: any,
  lazy?: boolean,
  load?: any
}

// 列的属性
export interface ColumnProps {
  type?: '' | 'index' | 'selection' | 'expand' | null | undefined
  className?: string
  labelClassName?: string
  property?: string
  width?: string | number
  minWidth?: string | number
  renderHeader?: any
  sortable?: string | boolean
  sortMethod?: any
  sortBy?: string | any | any[]
  resizable?: boolean
  columnKey?: string
  align?: string
  headerAlign?: string
  showTooltipWhenOverflow?: boolean
  showOverflowTooltip?: boolean
  fixed?: string | boolean
  formatter?: (row: any, column: any, cellValue: any, index: number) => any
  selectable?: any
  reserveSelection?: any
  filterMethod?: any
  filteredValue?: any[]
  filters?: any[]
  filterPlacement?: string
  filterMultiple?: boolean
  index?: number | any
  sortOrders?: null | 'ascending' | 'descending'
}

export const defaultFilterSplit = '____'
// 在表格内容出现换行时需要考虑将列的宽度限制一下
export const columnWidth = {
  w2: 51, // 两个字 44时换行 45 + 6
  w3: 63, // 三个字 56时换行 57 + 6
  w4: 75, // 四个字
  w5: 87, // 五个字
  w6: 99, // 六个字
  w120: 120,
  w160: 160,
  w180: 180,
  w200: 200,
  w260: 260,
  w320: 320,
  date: 90, // 83时换行 yyyy-MM-dd 84 + 6
  dateTime: 124, // 117时换行 yyyy-MM-dd HH:mm 118 + 6
  dateTimeAll: 140, // 133时换行 yyyy-MM-dd HH:mm:ss 134 + 6
}
