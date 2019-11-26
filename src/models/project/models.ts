export const defaultTitle = '管理系统'
// 页面内标题
export const defaultPageTitleMap = {
  view: '详情',
  create: '创建',
  edit: '编辑',
}
export const genderList = [
  {
    id: 1,
    label: '男',
  },
  {
    id: 2,
    label: '女',
  },
]
export const statusList = [
  {
    id: 1,
    label: '在职',
  },
  {
    id: 2,
    label: '离职',
  },
]
export const menuFlagMap = {
  operate: { name: 'operate', route: 'chart' },
  teacher: { name: 'teacher', route: 'myTodo' },
  sale: { name: 'sale', route: 'courseIntro' },
  system: { name: 'system', route: 'systemClass' },
}
export const roleMap = {
  superAdmin: '1',
  admin: '2',
  foreignTeacher: '3',
  assistant: '4',
  sale: '5',
  operate: '6',
}
// 1：超级管理员；2：管理员；3：外教；4：助教；5：销售老师；6：运营老师
export const positionList = [
  {
    id: '1',
    label: '超级管理员',
  },
  {
    id: '2',
    label: '管理员',
  },
  {
    id: '3',
    label: '外教',
  },
  {
    id: '4',
    label: '助教',
  },
  {
    id: '5',
    label: '销售老师',
  },
  {
    id: '6',
    label: '运营老师',
  },
]
// 1：微信；2：支付宝；3：现金；4：银联
export const payMethodList = [
  {
    id: 1,
    label: '微信',
  },
  {
    id: 2,
    label: '支付宝',
  },
  {
    id: 3,
    label: '现金',
  },
  {
    id: 4,
    label: '银联',
  },
]
// 1：已付款；2：未付款
export const payStatusList = [
  {
    id: 1,
    label: '已付款',
  },
  {
    id: 2,
    label: '未付款',
  },
]
// 1：父母；2：外祖父母；3：祖父母
export const relationshipList = [
  {
    id: 1,
    label: '父母',
  },
  {
    id: 2,
    label: '外祖父母',
  },
  {
    id: 3,
    label: '祖父母',
  },
]
export const noticeType = [
  {
    id: 1,
    label: '其他通知',
  },
  {
    id: 2,
    label: '上课通知',
  },
  {
    id: 3,
    label: '下课通知',
  },
]
export const contactType = [
  {
    id: 1,
    label: '课程合同',
  },
  {
    id: 2,
    label: '其他合同',
  },
]
export const reviewType = [
  {
    id: 1,
    label: '外教待操作',
  },
  {
    id: 2,
    label: '助教待操作',
  },
  {
    id: 3,
    label: '已推送',
  },
]
// export const watchType = [
//   {
//     id: 0,
//     label: '未观看'
//   }, {
//     id: 1,
//     label: '已观看'
//   }
// ]
export const watchType = {
  nWatch: 0,
  watched: 1,
}
export const classStatusList = [
  {
    id: 1,
    label: '已分班',
  },
  {
    id: 2,
    label: '未分班',
  },
]
export const expireStatusList = [
  {
    id: 1,
    label: '已到期',
  },
  {
    id: 2,
    label: '未到期',
  },
]
export const dataTypeList = [
  {
    id: 1,
    label: '我的代办',
  },
  {
    id: 2,
    label: '复习资料',
  },
  {
    id: 3,
    label: '月度报告',
  },
  {
    id: 4,
    label: '接收学员',
  },
  {
    id: 5,
    label: '补课安排',
  },
  {
    id: 6,
    label: '家长反馈',
  },
]

