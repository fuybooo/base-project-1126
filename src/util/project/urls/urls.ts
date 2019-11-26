import Vue from 'vue'
import { prefix, urlType } from '@/util/project/urls/url-util'

// 该接口与urls保持一致，保证使用this.$urls时能够通过"."得到提示
export interface Urls {
  demo: {
    table: {
      get: urlType,
      getById: urlType,
      create: urlType,
      edit: urlType,
      del: urlType,
    },
  },
  login: {
    login: urlType,
    hasLogin: urlType,
    forgot: urlType,
    register: urlType,
    logout: urlType,
  },
  // user: {
  //   getCrt: urlType,
  // },
  message: {
    list: urlType,
    changeStatus: urlType,
  },
  // 校区
  campus: {
    addCampus: urlType,
    updateCampus: urlType,
    queryCampusList: urlType,
    queryCampusListNoPage: urlType,
    delCampus: urlType,
  },
  // 人员
  staff: {
    addStaff: urlType,
    updateStaff: urlType,
    queryStaffList: urlType,
    queryStaffListNoPage: urlType,
    delStaff: urlType,
    detailStaff: urlType,
  },
  course: {
    addCourse: urlType,
    updateCourse: urlType,
    queryCourseList: urlType,
    queryCourseListNoPage: urlType,
    delCourse: urlType,
  },
  courseType: {
    queryCourseTypeList: urlType,
  },
  class: {
    queryClassList: urlType,
    queryClassListNoPage: urlType,
    queryClass: urlType,
    addClass: urlType,
    updateClass: urlType,
    stopCourse: urlType,
  },
  subject: {
    addSubject: urlType,
    querySubjectListNoPage: urlType,
  },
  student: {
    queryStudentList: urlType,
    queryStudent: urlType,
    // queryStudentDetailList: urlType,
    delStudent: urlType,
    queryStudentListByClassId: urlType,
    addMakeUp: urlType,
  },
  teacher: {
    todolist: urlType,
    reviewInglist: urlType,
    parentUpdatelist: urlType,
  },
  // 绘本分类
  picBookType: {
    picBookTypeList: urlType,
    delPicBookType: urlType,
    updatePicBookType: urlType,
  }
  // 绘本
  picBook: {
    picBookList: urlType,
  }
  // 轮播图
  chart: {
    list: urlType,
  }
  // 发展规划
  development: {
    list: urlType,
    update: urlType,
  }
  // 风采展示
  elegant: {
    list: urlType,
    update: urlType,
  }
  // 教师简介
  profiles: {
    list: urlType,
    update: urlType,
  }
  // 消息通知
  notice: {
    historyList: urlType,
  }
  // 预约测评
  evaluation: {
    list: urlType,
    fileList: urlType,
    publicFile: urlType,
  }
  // 合同管理
  contract: {
    list: urlType,
    coursePackageList: urlType,
    saveOption: urlType,
    delContract: urlType,
  }
  // 家长上传
  parentUpdate: {
    list: urlType,
    updateStatus: urlType,
  }
  // 资料管理
  material: {
    queryMaterialList: urlType,
    queryMaterial: urlType,
    addMaterial: urlType,
  }
}

const urls: Urls = {
  demo: {
    table: {
      get: { url: 'table/get', isStatic: true, prefix: prefix.demo },
      getById: { url: 'table/getById', isStatic: true, prefix: prefix.demo },
      create: { url: 'table/create', isStatic: true, prefix: prefix.demo },
      edit: { url: 'table/edit', isStatic: true, prefix: prefix.demo },
      del: { url: 'table/del', isStatic: true, prefix: prefix.demo },
    },
  },
  login: {
    // 登录
    login: { url: 'login', isStatic: true, prefix: prefix.login },
    // 根据token判断是否已经登录，若已登陆，则返回用户的登录信息
    hasLogin: { url: 'hasLogin', isStatic: true, prefix: prefix.login },
    forgot: { url: 'forgot', isStatic: true, prefix: prefix.login },
    register: { url: 'register' },
    logout: { url: 'logout', isStatic: true, prefix: prefix.login },
  },
  message: {
    list: { url: 'list', isStatic: true, prefix: prefix.message },
    changeStatus: { url: 'changeStatus', isStatic: true, prefix: prefix.message },
  },
  campus: {
    queryCampusList: { url: 'queryCampusList', isStatic: true, prefix: prefix.campus },
    queryCampusListNoPage: { url: 'queryCampusListNoPage', isStatic: true, prefix: prefix.campus },
    addCampus: { url: 'addCampus', isStatic: true, prefix: prefix.campus, isCommon: true },
    updateCampus: { url: 'updateCampus', isStatic: true, prefix: prefix.campus, isCommon: true },
    delCampus: { url: 'delCampus', isStatic: true, prefix: prefix.campus, isCommon: true },
  },
  staff: {
    queryStaffList: { url: 'queryStaffList', isStatic: true, prefix: prefix.staff },
    queryStaffListNoPage: { url: 'queryStaffListNoPage', isStatic: true, prefix: prefix.staff },
    addStaff: { url: 'addStaff', isStatic: true, prefix: prefix.staff, isCommon: true },
    updateStaff: { url: 'updateStaff', isStatic: true, prefix: prefix.staff, isCommon: true },
    delStaff: { url: 'delStaff', isStatic: true, prefix: prefix.staff, isCommon: true },
    detailStaff: { url: 'detailStaff', isStatic: true, prefix: prefix.staff, isCommon: true },
  },
  course: {
    queryCourseList: { url: 'queryCourseList', isStatic: true, prefix: prefix.course },
    queryCourseListNoPage: { url: 'queryCourseListNoPage', isStatic: true, prefix: prefix.course },
    addCourse: { url: 'addCourse', isStatic: true, prefix: prefix.course, isCommon: true },
    updateCourse: { url: 'updateCourse', isStatic: true, prefix: prefix.course, isCommon: true },
    delCourse: { url: 'delCourse', isStatic: true, prefix: prefix.course, isCommon: true },
  },
  courseType: {
    queryCourseTypeList: { url: 'queryCourseTypeList', isStatic: true, prefix: prefix.courseType },
  },
  class: {
    queryClassList: { url: 'queryClassList', isStatic: true, prefix: prefix.class },
    queryClassListNoPage: { url: 'queryClassListNoPage', isStatic: true, prefix: prefix.class },
    queryClass: { url: 'queryClass', isStatic: true, prefix: prefix.class },
    addClass: { url: 'addClass', isStatic: true, prefix: prefix.class, isCommon: true },
    updateClass: { url: 'updateClass', isStatic: true, prefix: prefix.class, isCommon: true },
    stopCourse: { url: 'stopCourse', isStatic: true, prefix: prefix.class, isCommon: true },
  },
  subject: {
    addSubject: { url: 'addSubject', isStatic: true, prefix: prefix.subject, isCommon: true },
    querySubjectListNoPage: { url: 'querySubjectListNoPage', isStatic: true, prefix: prefix.subject },
  },
  student: {
    queryStudentList: { url: 'queryStudentList', isStatic: true, prefix: prefix.student },
    queryStudent: { url: 'queryStudent', isStatic: true, prefix: prefix.student },
    // queryStudentDetailList: { url: 'queryStudentDetailList', isStatic: true, prefix: prefix.student },
    delStudent: { url: 'delStudent', isStatic: true, prefix: prefix.student, isCommon: true },
    queryStudentListByClassId: {
      url: 'queryStudentListByClassId',
      isStatic: true,
      prefix: prefix.student,
      isCommon: true,
    },
    addMakeUp: { url: 'addMakeUp', isStatic: true, prefix: prefix.student, isCommon: true },
  },
  teacher: {
    todolist: { url: 'todolist', isStatic: true, prefix: prefix.teacher },
    reviewInglist: { url: 'reviewInglist', isStatic: true, prefix: prefix.teacher },
    parentUpdatelist: { url: 'parentUpdatelist', isStatic: true, prefix: prefix.teacher },
  },
  picBookType: {
    picBookTypeList: { url: 'picBoookTypeList', isStatic: true, prefix: prefix.picBookType },
    delPicBookType: { url: 'delPicBookType', isStatic: true, prefix: prefix.picBookType, isCommon: true },
    updatePicBookType: { url: 'updatePicBookType', isStatic: true, prefix: prefix.picBookType, isCommon: true },
  },
  picBook: {
    picBookList: { url: 'picBookList', isStatic: true, prefix: prefix.picBook },
  },
  chart: {
    list: { url: 'list', isStatic: true, prefix: prefix.chart },
  },
  development: {
    list: { url: 'list', isStatic: true, prefix: prefix.development },
    update: { url: 'update', isStatic: true, prefix: prefix.development, isCommon: true },
  },
  elegant: {
    list: { url: 'list', isStatic: true, prefix: prefix.elegant },
    update: { url: 'update', isStatic: true, prefix: prefix.elegant, isCommon: true },
  },
  profiles: {
    list: { url: 'list', isStatic: true, prefix: prefix.profiles },
    update: { url: 'update', isStatic: true, prefix: prefix.profiles, isCommon: true },
  },
  notice: {
    historyList: { url: 'historyList', isStatic: true, prefix: prefix.notice },
  },
  evaluation: {
    list: { url: 'list', isStatic: true, prefix: prefix.evaluation },
    fileList: { url: 'fileList', isStatic: true, prefix: prefix.evaluation },
    publicFile: { url: 'update', isStatic: true, prefix: prefix.profiles, isCommon: true },
  },
  contract: {
    list: { url: 'list', isStatic: true, prefix: prefix.contract },
    coursePackageList: { url: 'coursePackageList', isStatic: true, prefix: prefix.contract },
    saveOption: { url: 'saveOption', isStatic: true, prefix: prefix.contract, isCommon: true },
    delContract: { url: 'delContract', isStatic: true, prefix: prefix.contract, isCommon: true },
  },
  parentUpdate: {
    list: { url: 'list', isStatic: true, prefix: prefix.parentUpdate },
    updateStatus: { url: 'updateStatus', isStatic: true, prefix: prefix.parentUpdate, isCommon: true },
  },
  material: {
    queryMaterialList: { url: 'queryMaterialList', isStatic: true, prefix: prefix.material },
    queryMaterial: { url: 'queryMaterial', isStatic: true, prefix: prefix.material },
    addMaterial: { url: 'addMaterial', isStatic: true, prefix: prefix.material, isCommon: true },
  },
}
Vue.prototype.$urls = urls
