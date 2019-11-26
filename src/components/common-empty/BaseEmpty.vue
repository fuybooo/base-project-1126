<template>
  <div class="base-empty">
    <slot>暂无数据</slot>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import './BaseEmpty.less'

  @Component({})
  export default class BaseEmpty extends Vue {

  }
</script>
