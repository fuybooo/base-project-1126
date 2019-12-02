<template>
  <div class="demo-page">
    <h2>同个页面出现多个相同请求的远程选择器 demo</h2>
    <h3>1. 常规用法</h3>
    <div class="demo-box">
      <div class="demo-line">
        <!--        第一次请求成功之后，缓存就会存在了，之后的请求就会都去取缓存-->
        <base-remote-select
          :delay="index > 0 ? 500 : 0"
          :key="item.key"
          type="staff"
          use-cache
          v-for="(item, index) in valueList"
          v-model="item.value"
        ></base-remote-select>
      </div>
    </div>
    <div class="h1000"></div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { guid } from '@/util/common/fns/fns'

  @Component({})
  export default class MultipleRemoteSelectDemo extends Vue {
    public valueList: any[] = Array(20).fill(0).map(item => ({ key: guid(), value: '' }))

    public created () {
    }
  }
</script>
<style lang="less" scoped>
  .h1000 {
    height: 1000px;
  }
</style>
