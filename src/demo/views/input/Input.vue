<template>
  <div>
    <h3>测试input的双向绑定</h3>
    <el-input @change="changeInput" placeholder="placeholder" v-model="row.width"></el-input>
    <hr>
    <h3>测试循环中input的双向绑定</h3>
    {{list}}
    <ul>
      <li :key="i" class="flex-box" v-for="(item, i) of list">
        <span>{{i}}</span>
        <el-input @change="changeListInput(item, $event)" placeholder="placeholder" v-model="item.width"></el-input>
      </li>
    </ul>
    <h3>测试绑定值的一个机制</h3>
    list: {{testList}}
    <el-button @click="testListClick(1)" type="primary">改变list的第一项</el-button>
    <el-button @click="testListClick(2)" type="primary">给list的第二项增加一个字符串属性</el-button>
    <el-button @click="testListClick(3)" type="primary">给list的第三项增加一个对象属性</el-button>
    <h3>测试保存按钮组件</h3>
    <base-action :loading.sync="loading" @click="handleClick"></base-action>
    <hr>
    <h3>测试组件外的属性变化时，组件内的方法如何执行</h3>
    <demo-prop :property="property"></demo-prop>
    <el-button @click="changeProperty" type="text">切换property</el-button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import DemoProp from '@/demo/views/input/DemoProp.vue'

  @Component({ components: { DemoProp } })
  export default class Input extends Vue {
    public row = {
      width: 'auto',
    }
    public list = [
      {
        width: '1',
      },
      {},
      {
        width: 'auto',
      },
      {
        width: '',
      },
    ]
    public testList: any[] = [
      {
        a: 1,
      },
      {
        a: 2,
      },
      {
        a: 3,
      },
    ]
    public loading = false
    public property = ''

    public changeProperty () {
      this.property = this.property === '' ? '1' : ''
    }

    public testListClick (type: number) {
      if (type === 1) {
        this.testList[0].a = 'test'
      } else if (type === 2) {
        this.testList[1].b = 'test b'
      } else if (type === 3) {
        this.testList[2].b = { newProperty: 'test new Property' }
      }
      // 上述 type = 2 与 3 无效
      if (type === 2) {
        this.testList[1] = { ...this.testList[1], b: 'test: b' }
      } else if (type === 3) {
        this.testList[2] = { ...this.testList[1], b: { newProperty: 'test new Property' } }
      }
      // 上述也无效，需要下面这行代码才能生效
      this.testList = [ ...this.testList ]
    }

    public changeInput (value: string) {
      if (isNaN(+ value)) {
        this.row.width = 'auto'
      } else {
        this.row.width = value || 'auto'
      }
    }

    public changeListInput (item: any, value: string) {
      if (isNaN(+ value)) {
        item.width = 'auto'
      } else {
        item.width = value || 'auto'
      }
    }

    public handleClick () {
      setTimeout(() => {
        this.loading = false
      }, 200)
    }
  }
</script>
<style lang="less" scoped>

</style>
