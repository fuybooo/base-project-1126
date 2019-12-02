import { ProRouteConfig } from '@/models/project/route/route.model'
import Demo from '@/demo/views/Demo.vue'
import BaseFormDemo from '@/demo/views/form/BaseFormDemo.vue'
import Checkbox from '@/demo/views/checkbox/Checkbox.vue'
import SlotFormDemo from '@/demo/views/form/SlotFormDemo.vue'
import BaseTableDemo from '@/demo/views/table/BaseTableDemo.vue'
import FunctionTest from '@/demo/views/html/FunctionTest.vue'
import Input from '@/demo/views/input/Input.vue'
import FormDetailDemo from '@/demo/views/form/FormDetailDemo.vue'
import ParentPage from '@/demo/views/html/iframe-test/ParentPage.vue'
import BaseTreeDemo from '@/demo/views/tree/BaseTreeDemo.vue'
import CascaderDemo from '@/demo/views/cascader/cascader.vue'
import DialogDemo from '@/demo/views/dialog/Dialog.vue'
import { setUpRouter } from '@/models/project/route/route.fn'
import VueCropperDemo from '@/demo/views/vue-cropper/VueCropperDemo.vue'
import RouterParams from '@/demo/views/router-params/RouterParams.vue'
import ButtonDemo from '@/demo/views/button/Button.vue'
import RemoteSelectDemo from '@/demo/views/remote-select/RemoteSelectDemo.vue'
import MultipleRemoteSelectDemo from '@/demo/views/remote-select/MultipleRemoteSelectDemo.vue'
import BaseLayoutDemo from '@/demo/views/layout/base-layout-demo.vue'
import WangeditorDemo from '@/demo/views/wangeditor/WangeditorDemo.vue'
import ChartsDemo from '@/demo/views/charts/ChartsDemo.vue'
import AddressDemo from '@/demo/views/address/Address.vue'
import UploadDemo from '@/demo/views/upload/UploadDemo.vue'

const demoRouter: ProRouteConfig = {
  path: '/demo',
  name: 'demo',
  component: Demo,
  children: [
    {
      path: 'base-form',
      name: 'demo-base-form', // 请注意name的唯一性 在多个地方引用同一路由时，需要改变name之后再引用，否则可能导致刷新页面时不能正确激活当前路由
      component: BaseFormDemo,
      meta: {
        title: '基础表单示例',
      },
    },
    {
      path: 'slot-form',
      name: 'demo-slot-form',
      component: SlotFormDemo,
      meta: {
        title: '插槽表单示例',
      },
    },
    {
      path: 'checkbox',
      name: 'demo-checkbox',
      component: Checkbox,
      meta: {
        title: 'checkbox示例',
      },
    },
    {
      path: 'base-table',
      name: 'demo-base-table',
      component: BaseTableDemo,
      meta: {
        title: '基础表格示例',
      },
    },
    {
      path: 'function-test',
      name: 'demo-function-test',
      component: FunctionTest,
      meta: {
        title: '测试函数的使用',
      },
    },
    {
      path: 'input',
      name: 'demo-input',
      component: Input,
      meta: {
        title: '输入框示例',
      },
    },
    // 所有路由上需要指示当前页面状态的参数key都为pattern
    {
      path: 'form-detail/:pattern/:id?',
      name: 'demo-form-detail',
      component: FormDetailDemo,
      meta: {
        title: '表单详情示例',
        parentName: 'demo-base-table', // 刷新时将激活该菜单
      },
    },
    {
      path: 'html/iframe/parent-page',
      name: 'demo-parent-page',
      component: ParentPage,
      meta: {
        title: 'iframe示例',
      },
    },
    {
      path: 'base-tree',
      name: 'demo-base-tree',
      component: BaseTreeDemo,
      meta: {
        title: '树组件示例',
      },
    },
    {
      path: 'cascader',
      name: 'demo-cascader',
      component: CascaderDemo,
      meta: {
        title: '级联选择器示例',
      },
    },
    {
      path: 'dialog',
      name: 'demo-dialog',
      component: DialogDemo,
      meta: {
        title: '弹出层示例',
      },
    },
    {
      path: 'vueCropper',
      name: 'demo-vueCropper',
      component: VueCropperDemo,
      meta: {
        title: '图片裁剪示例',
      },
    },
    {
      path: 'routerParams/:a/:b',
      name: 'demo-routerParams',
      component: RouterParams,
      meta: {
        title: '路由传参示例',
      },
    },
    {
      path: 'button',
      name: 'demo-button',
      component: ButtonDemo,
      meta: {
        title: '按钮样式',
      },
    },
    {
      path: 'remoteSelect',
      name: 'demo-remoteSelect',
      component: RemoteSelectDemo,
      meta: {
        title: '远程选择器',
      },
    },
    {
      path: 'multipleRemoteSelect',
      name: 'demo-multipleRemoteSelect',
      component: MultipleRemoteSelectDemo,
      meta: {
        title: '多个远程选择器',
      },
    },
    {
      path: 'layout',
      name: 'demo-layout',
      component: BaseLayoutDemo,
      meta: {
        title: '布局示例',
      },
    },
    {
      path: 'wangeditor',
      name: 'demo-wangeditor',
      component: WangeditorDemo,
      meta: {
        title: 'wangeditor示例',
      },
    },
    {
      path: 'charts',
      name: 'demo-charts',
      component: ChartsDemo,
      meta: {
        title: 'charts示例',
      },
    },
    {
      path: 'address',
      name: 'demo-address',
      component: AddressDemo,
      meta: {
        title: 'address示例',
      },
    },
    {
      path: 'upload',
      name: 'demo-upload',
      component: UploadDemo,
      meta: {
        title: '上传demo',
      },
    },
  ],
  meta: {
    title: '示例',
  },
}
export default setUpRouter(demoRouter, { hidden: false })
