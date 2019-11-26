<template>
  <div>
    路由参数:{{ $route.params }}
    查询参数:{{ $route.query }}
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({})
  export default class RouterParams extends Vue {
    public created () {
      console.log('路由：', this.$route)
      console.log('路由器：', this.$router)
    }
  }
</script>
<style lang="less" scoped>

</style>
