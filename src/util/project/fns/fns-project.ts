import { Pattern } from '@/models/common/models'
import { defaultPageTitleMap } from '@/models/project/models'

export function getPageTitle (pattern: Pattern, pageTitle: any = defaultPageTitleMap, pageTitleMap: any = defaultPageTitleMap) {
  if (typeof pageTitle === 'string') {
    if (pattern === 'view') {
      return pageTitle + pageTitleMap[pattern]
    }
    return pageTitleMap[pattern] + pageTitle
  } else {
    return pageTitleMap[pattern]
  }
}

export function getWeekName (index: number) {
  let label = ''
  switch (index) {
    case 0:
      label = '周一'
      break
    case 1:
      label = '周二'
      break
    case 2:
      label = '周三'
      break
    case 3:
      label = '周四'
      break
    case 4:
      label = '周五'
      break
    case 5:
      label = '周六'
      break
    case 6:
      label = '周日'
      break
    default:
      label = '周一'
      break
  }
  return label
}
