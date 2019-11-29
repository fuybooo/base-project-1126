<template>
  <div class="demo-page">
    <h2>charts demo</h2>
    <h3>1. 常规用法</h3>
    <div class="demo-box">
      <div class="demo-line">
        <p>使用场景：使用 vue-echarts </p>
        <v-chart :options="polar"></v-chart>
      </div>
      <div class="demo-line">
        <p>使用场景：使用 echarts </p>
        <div ref="example" style="width: 500px;height: 300px;"></div>
      </div>
    </div>
    <div class="h1000"></div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import Echarts from 'echarts'

  @Component({})
  export default class ChartsDemo extends Vue {
    public polar = {}
    public option = {}

    public created () {
      this.$nextTick(() => {
        const chart = Echarts.init(this.$refs.example as any)
        this.option = {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
            data:['销量']
          },
          xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        }
        chart.setOption(this.option)
        this.polar = this.option
      })
    }
  }
</script>
<style lang="less" scoped>
  .h1000 {
    height: 1000px;
  }
</style>
