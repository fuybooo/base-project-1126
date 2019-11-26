1. 命令 tree -I 'node_modules'
2. 输出目录结构
```
├── README.md // 简介
├── babel.config.js
├── bs-config.json
├── catalog.md
├── cypress.json
├── package.json // 命令 依赖 项目配置
├── postcss.config.js
├── public // 静态资源
│   ├── favicon.ico // 网站图标
│   ├── img
│   │   └── icons
│   │       ├── android-chrome-192x192.png
│   │       ├── android-chrome-512x512.png
│   │       ├── apple-touch-icon-120x120.png
│   │       ├── apple-touch-icon-152x152.png
│   │       ├── apple-touch-icon-180x180.png
│   │       ├── apple-touch-icon-60x60.png
│   │       ├── apple-touch-icon-76x76.png
│   │       ├── apple-touch-icon.png
│   │       ├── favicon-16x16.png // 网站图标需要改这两个文件才能生效
│   │       ├── favicon-32x32.png // 网站图标需要改这两个文件才能生效
│   │       ├── msapplication-icon-144x144.png
│   │       ├── mstile-150x150.png
│   │       └── safari-pinned-tab.svg
│   ├── index.html
│   ├── manifest.json
│   ├── mock // 静态mock数据
│   │   ├── README.md
│   │   ├── demo
│   │   │   └── table
│   │   │       ├── create.json
│   │   │       ├── del.json
│   │   │       ├── edit.json
│   │   │       ├── get.json
│   │   │       └── getById.json
│   │   ├── login
│   │   │   ├── hasLogin.json
│   │   │   └── login.json
│   │   ├── menu
│   │   │   └── list.json
│   │   ├── result
│   │   │   ├── error.json
│   │   │   └── success.json
│   │   └── staff
│   │       ├── queryStaffList.json
│   │       └── queryStaffListNoPage.json
│   └── robots.txt
├── scripts // 开发，部署，相关脚本
│   ├── commit-helper
│   │   └── commit-gh-page.sh
│   ├── front-helper
│   │   ├── CREATE.md
│   │   ├── create-config-exmple.json
│   │   ├── create-config.json
│   │   ├── create-content-detail.js
│   │   ├── create-content-main-router.js
│   │   ├── create-content-main.js
│   │   ├── create-content-page.js
│   │   ├── create-content-router.js
│   │   ├── create-file-log.txt
│   │   ├── create-module.js
│   │   ├── create.js
│   │   └── test-create-module.js
│   ├── start
│   │   └── start-db.sh
│   └── util
│       └── util.js
├── shared // 前后端共享的方法，变量，配置 【如果后端是nodejs】
│   ├── env.ts
│   ├── fns.ts
│   └── model.ts
├── src // vue 代码
│   ├── App.vue // 根组件
│   ├── api // 配置请求拦截器
│   │   ├── README.md
│   │   └── base-axios.ts
│   ├── assets // 静态资源
│   │   ├── fonts // 字体图片
│   │   │   ├── README.md
│   │   │   ├── icomoon.eot
│   │   │   ├── icomoon.svg
│   │   │   ├── icomoon.ttf
│   │   │   └── icomoon.woff
│   │   ├── i18n // 国际化
│   │   │   ├── cn.ts
│   │   │   └── en.ts
│   │   ├── img // 图片
│   │   │   ├── README.md
│   │   │   ├── logo.png
│   │   │   └── user.png
│   │   └── less // 样式
│   │       ├── common
│   │       │   ├── README.md
│   │       │   ├── base.less // 原子类
│   │       │   ├── box-model.less // 原子类 - 盒模型相关
│   │       │   ├── element-reset // 重置 element 相关样式
│   │       │   │   ├── README.md
│   │       │   │   ├── button.less
│   │       │   │   ├── card.less
│   │       │   │   ├── checkbox.less
│   │       │   │   ├── dialog.less
│   │       │   │   ├── form.less
│   │       │   │   ├── layout.less
│   │       │   │   ├── message.less
│   │       │   │   ├── table.less
│   │       │   │   └── tree.less
│   │       │   ├── element-variable.scss
│   │       │   ├── iconfont.css // 字体图片样式
│   │       │   ├── index.less // 导出样式
│   │       │   ├── style.less // 公共样式
│   │       │   └── var.less // 公共变量
│   │       └── project // 业务相关样式
│   │           ├── README.md
│   │           ├── index.less
│   │           ├── layout.less
│   │           └── style.less
│   ├── components // 组件，大部分是公共组件，业务组件，可以放在 biz 文件夹中
│   │   ├── README.md
│   │   ├── common-action-button
│   │   │   └── BaseAction.vue // 动作按钮 - 点击之后等待
│   │   ├── common-confirm-button
│   │   │   ├── BaseConfirm.vue // 确认按钮 - 点击之后弹出框再次确认
│   │   │   └── README.md
│   │   ├── common-cropper
│   │   │   ├── BaseCropper.less
│   │   │   └── BaseCropper.vue // 图片裁剪组件
│   │   ├── common-dialog
│   │   │   ├── BaseConfirmDialog.vue // 在弹窗中再次确认
│   │   │   ├── BaseDialog.less
│   │   │   ├── BaseDialog.vue // 通用弹出窗组件
│   │   │   ├── ImportDialog.vue // 通用导入组件
│   │   │   └── README.md
│   │   ├── common-empty
│   │   │   ├── BaseEmpty.less
│   │   │   └── BaseEmpty.vue // 显示空内容的组件
│   │   ├── common-flex
│   │   │   ├── BaseFlex.less
│   │   │   ├── BaseFlex.vue // 横向布局组件
│   │   │   ├── BaseHeaderPage.vue // 纵向布局组件
│   │   │   ├── BaseSidePage.vue // 横向布局组件的一个特例 - 用于页面的横向布局
│   │   │   └── README.md
│   │   ├── common-form
│   │   │   ├── BaseForm.less
│   │   │   ├── BaseForm.ts // 基础表单组件
│   │   │   ├── README.md
│   │   │   └── form.model.ts
│   │   ├── common-menu
│   │   │   ├── BaseMenu.less
│   │   │   ├── BaseMenu.ts // 菜单组件
│   │   │   ├── README.md
│   │   │   ├── menu.fn.ts
│   │   │   └── menu.model.ts
│   │   ├── common-radio-input
│   │   │   ├── BaseRadioInput.less
│   │   │   └── BaseRadioInput.vue // 单选按钮 + 输入框 组件
│   │   ├── common-select
│   │   │   ├── BaseRemoteSelect.ts
│   │   │   ├── BaseRemoteSelect.vue // 远程选择器组件
│   │   │   ├── BaseSelect.vue
│   │   │   └── remote.plugin.ts
│   │   ├── common-table
│   │   │   ├── BaseTable.less
│   │   │   ├── BaseTable.ts // 基础表格组件
│   │   │   ├── README.md
│   │   │   └── table.model.ts
│   │   ├── common-upload
│   │   │   ├── BaseUpload.less
│   │   │   ├── BaseUpload.vue // 基础上传组件
│   │   │   └── README.md
│   │   ├── common-view-html
│   │   │   ├── BaseViewHtml.less
│   │   │   ├── BaseViewHtml.ts // 用于表单的回显组件
│   │   │   └── README.md
│   │   ├── index.ts
│   │   ├── lang-setting
│   │   │   ├── LangSetting.vue
│   │   │   └── README.md
│   │   └── page-header
│   │       ├── PageHeader.vue // 页面面包屑
│   │       └── README.md
│   ├── config
│   │   ├── README.md
│   │   ├── base-config.ts // 项目配置信息
│   │   ├── dev-config.ts // 开发配置
│   │   └── i18n-config.ts
│   ├── demo // 示例
│   │   ├── assets
│   │   │   └── less
│   │   │       └── index.less
│   │   ├── models
│   │   │   └── demo.model.ts
│   │   ├── router
│   │   │   └── router.ts
│   │   └── views
│   │       ├── Demo.vue
│   │       ├── button
│   │       │   └── Button.vue
│   │       ├── cascader
│   │       │   └── cascader.vue
│   │       ├── checkbox
│   │       │   └── Checkbox.vue
│   │       ├── dialog
│   │       │   └── Dialog.vue
│   │       ├── form
│   │       │   ├── BaseFormDemo.vue
│   │       │   ├── FormDetailDemo.vue
│   │       │   └── SlotFormDemo.vue
│   │       ├── html
│   │       │   ├── FunctionTest.vue
│   │       │   └── iframe-test
│   │       │       ├── ParentPage.vue
│   │       │       └── iframe.html
│   │       ├── input
│   │       │   ├── DemoProp.vue
│   │       │   └── Input.vue
│   │       ├── layout
│   │       │   └── base-layout-demo.vue
│   │       ├── log
│   │       │   └── DemoLog.vue
│   │       ├── remote-select
│   │       │   └── RemoteSelectDemo.vue
│   │       ├── render-demo
│   │       │   └── RenderDemo.ts
│   │       ├── router-params
│   │       │   └── RouterParams.vue
│   │       ├── table
│   │       │   └── BaseTableDemo.vue
│   │       ├── tree
│   │       │   └── BaseTreeDemo.vue
│   │       └── vue-cropper
│   │           └── VueCropperDemo.vue
│   ├── main.ts
│   ├── mixins
│   │   ├── common
│   │   └── project
│   │       └── SignStepMixin.ts // mixins 的一个用法示例
│   ├── models
│   │   ├── common
│   │   │   ├── README.md
│   │   │   ├── models.ts
│   │   │   ├── regexps.ts // 项目中用到的正则
│   │   │   └── types.ts
│   │   └── project
│   │       ├── README.md
│   │       ├── dic
│   │       │   └── dic.ts
│   │       ├── local-storage-keys
│   │       │   └── keys.ts // 项目中用到的 localStorage cookies 的 key
│   │       ├── models.ts
│   │       ├── route
│   │       │   ├── route.fn.ts
│   │       │   └── route.model.ts
│   │       └── user
│   │           └── user.ts
│   ├── modules // 业务模块
│   │   ├── README.md
│   │   ├── login
│   │   │   ├── Forgot.vue
│   │   │   ├── Login.vue
│   │   │   ├── Register.vue
│   │   │   ├── assets
│   │   │   │   ├── img
│   │   │   │   └── less
│   │   │   │       └── index.less
│   │   │   └── login.service.ts
│   │   └── main
│   │       ├── Main.vue
│   │       ├── MainAside.vue
│   │       ├── MainHeader.vue
│   │       ├── MainHome.vue
│   │       ├── assets
│   │       │   ├── img
│   │       │   │   ├── avatar.png
│   │       │   │   ├── b-s.png
│   │       │   │   └── c.png
│   │       │   └── less
│   │       │       └── index.less
│   │       └── models
│   │           └── models.ts
│   ├── registerServiceWorker.ts
│   ├── router // 路由
│   │   ├── README.md
│   │   ├── main.router.ts
│   │   └── router.ts
│   ├── shims-tsx.d.ts
│   ├── shims-vue-prototype.d.ts
│   ├── shims-vue.d.ts
│   ├── stores
│   │   ├── action-types.ts
│   │   ├── actions.ts
│   │   ├── mutation-types.ts
│   │   ├── mutations.ts
│   │   ├── states.ts
│   │   └── store.ts
│   └── util // 工具方法
│       ├── common
│       │   ├── fns
│       │   │   ├── README.md
│       │   │   ├── fns-array.ts
│       │   │   ├── fns-common.ts
│       │   │   ├── fns-dom.ts
│       │   │   ├── fns-form.ts
│       │   │   ├── fns-platform.ts
│       │   │   ├── fns-table.ts
│       │   │   ├── fns-tree.ts
│       │   │   └── fns.ts
│       │   └── vue-prototype
│       │       ├── README.md
│       │       └── vue-prototype.ts
│       └── project
│           ├── README.md
│           ├── biz
│           │   ├── index.ts
│           │   └── user.ts
│           ├── fns
│           │   ├── fns-project.ts
│           │   └── fns-ws.ts
│           ├── models
│           │   └── global-event.ts // 全局事件发送
│           └── urls
│               ├── url-util.ts
│               └── urls.ts // 请求 url
├── tests
│   ├── e2e
│   │   ├── plugins
│   │   │   └── index.js
│   │   ├── specs
│   │   │   └── test.js
│   │   └── support
│   │       ├── commands.js
│   │       └── index.js
│   └── unit
│       └── example.spec.ts
├── tsconfig.json
├── tslint.json
├── vue.config.js
└── webpack // 打包配置
    ├── README.md
    ├── entry.js
    ├── util.js
    ├── vue.config.js
    ├── vue.dev.config.js
    ├── vue.matched.config.js
    ├── vue.prod.config.js
    ├── webpack.base.config.js
    ├── webpack.config.js
    ├── webpack.dev.config.js
    ├── webpack.prod.config.js
    └── webpack.webstorm.config.js

```
