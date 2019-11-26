export interface IUrl {
  url: string
  prefix?: string
  isStatic?: boolean
  staticPath?: string
  isCommon?: boolean
}

/**
 * 需要根据打包时的配置设置静态资源的路径
 */
export const staticPath = '/mock/'
export declare type urlType = string | IUrl
export const prefix = {
  demo: 'demo/',
  login: 'login/',
  user: 'user/',
  message: 'message/',
  campus: 'campus/',
  staff: 'staff/',
  course: 'course/',
  courseType: 'courseType/',
  class: 'class/',
  subject: 'subject/',
  student: 'student/',
  teacher: 'teacher/',
  picBookType: 'picBookType/',
  picBook: 'picBook/',
  chart: 'chart/',
  development: 'development/',
  elegant: 'elegant/',
  profiles: 'profiles/',
  notice: 'notice/',
  evaluation: 'evaluation/',
  contract: 'contract/',
  parentUpdate: 'parentUpdate/',
  material: 'material/',
}


