<template>
<!--  通用的页面容器-->
  <base-header-page>
<!--    通用头部-->
    <base-flex slot="header" class="common-border-bottom" fixed="between">
      <span>头部标题</span>
      <el-button>头部按钮</el-button>
    </base-flex>
<!--    内容部分-->
    <base-header-page>
<!--      内容部分的头部-->
      <base-flex slot="header" fixed="between">
        <div>内容1</div>
        <div>内容2</div>
      </base-flex>
<!--      base-flex组件中可以只有一个元素-->
      <base-flex>
        正文内容
      </base-flex>
<!--      自定义base-flex样式-->
      <base-flex class="custom-content-style">
        主体内容
      </base-flex>
    </base-header-page>
  </base-header-page>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({})
  export default class BaseLayoutDemo extends Vue {
  }
</script>
<style lang="less">
  .custom-content-style.common {
    padding: 20px;
  }
</style>
