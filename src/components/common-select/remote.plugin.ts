import { debounce } from '@/util/common/fns/fns'

export function getConfig () {
  // @ts-ignore
  const me = this
  const config: any = {
    searchKey: me.searchKey,
    labelKey: me.labelKey,
    valueKey: me.valueKey,
  }
  switch (me.type) {
    // 员工
    case 'staff':
      config.url = me.$urls.staff.queryStaffListNoPage
      break
    // 科目
    case 'subject':
      config.url = me.$urls.subject.querySubjectListNoPage
      break
    // 课程
    case 'course':
      config.url = me.$urls.course.queryCourseListNoPage
      break
    // 课程包
    case 'courseBag':
      config.url = me.$urls.staff.queryStaffListNoPage
      break
    // 班级
    case 'class':
      config.url = me.$urls.class.queryClassListNoPage
      break
  }
  return config
}

/**
 * @param query
 */
export function filterMethod (query: string) {
  // @ts-ignore
  const me = this
  const config = getConfig.bind(me)()
  if (query) {
    me.options = me.originList.filter((item: any) => {
      return item[config.labelKey || me.labelKey].toLowerCase().includes(query.toLowerCase())
        || item.pinyinNormal.some((py: string) => py.toLowerCase().includes(query.toLowerCase()))
        || item.pinyinFirstLetter.some((py: string) => py.toLowerCase().includes(query.toLowerCase()))
    })
  } else {
    me.options = me.originList
  }
}

export function getUrl () {
  // @ts-ignore
  const me = this
  return me.url || getConfig.bind(me)().url
}

export function getParams (query?: string) {
  // @ts-ignore
  const me = this
  const config = getConfig.bind(me)()
  return {
    ...me.fixedParams,
    ...(me.searchAll ? {} : {
      start: 0,
      length: me.pageSize,
    }),
    [me.searchKey || config.searchKey]: query || '',
  }
}

export function remoteMethod (query: string) {
  // @ts-ignore
  const me = this
  debounce(() => {
    me.search(query)
  })()
}
