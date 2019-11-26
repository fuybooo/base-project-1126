import Vue from 'vue'
import '@/components/common-form/BaseForm'
import '@/components/common-table/BaseTable'
// import '@/components/common-select/BaseRemoteSelect'
import '@/components/common-view-html/BaseViewHtml'
import BaseMenu from '@/components/common-menu/BaseMenu'
import BaseAction from '@/components/common-action-button/BaseAction.vue'
import BaseConfirm from '@/components/common-confirm-button/BaseConfirm.vue'
import LangSetting from '@/components/lang-setting/LangSetting.vue'
import PageHeader from '@/components/page-header/PageHeader.vue'
import BaseDialog from '@/components/common-dialog/BaseDialog.vue'
import BaseConfirmDialog from '@/components/common-dialog/BaseConfirmDialog.vue'
import BaseUpload from '@/components/common-upload/BaseUpload.vue'
import BaseFlex from '@/components/common-flex/BaseFlex.vue'
import BaseSidePage from '@/components/common-flex/BaseSidePage.vue'
import BaseHeaderPage from '@/components/common-flex/BaseHeaderPage.vue'
import BaseEmpty from '@/components/common-empty/BaseEmpty.vue'
import BaseCropper from '@/components/common-cropper/BaseCropper.vue'
import BaseRadioInput from '@/components/common-radio-input/BaseRadioInput.vue'
import BaseRemoteSelect from '@/components/common-select/BaseRemoteSelect.vue'

// 注册全局组件
Vue.component('AppLangSetting', LangSetting)
Vue.component('BaseAction', BaseAction)
Vue.component('BaseConfirm', BaseConfirm)
Vue.component('AppPageHeader', PageHeader)
Vue.component('BaseMenu', BaseMenu)
Vue.component('BaseDialog', BaseDialog)
Vue.component('BaseConfirmDialog', BaseConfirmDialog)
Vue.component('BaseUpload', BaseUpload)
Vue.component('BaseFlex', BaseFlex)
Vue.component('BaseSidePage', BaseSidePage)
Vue.component('BaseHeaderPage', BaseHeaderPage)
Vue.component('BaseEmpty', BaseEmpty)
Vue.component('BaseCropper', BaseCropper)
Vue.component('BaseRadioInput', BaseRadioInput)
Vue.component('BaseRemoteSelect', BaseRemoteSelect)
