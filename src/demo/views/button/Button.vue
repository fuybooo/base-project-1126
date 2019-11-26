<template>
  <div class="demo-page">
    <h2>按钮 demo</h2>
    <h3>1. 常规按钮</h3>
    <div class="demo-box">
      <div class="demo-line">
        <p>使用场景：查询框中的查询按钮，重置，表格上方的新增，删除；返回等</p>
        <p class="black-4">按钮特点：直接在页面中使用，通过 type 属性控制按钮样式 尽量不要在button上使用 class </p>
        <p class="black-4">注意：这里增加了自定义type，border 和 bg </p>
        <el-button type="border">查询</el-button>
        <el-button type="bg">退回</el-button>
        <el-button type="primary">新增</el-button>
        <el-button>返回</el-button>
        <el-button>删除</el-button>
        <el-button>重置</el-button>
      </div>
    </div>
    <h3>2. 表格按钮</h3>
    <div class="demo-box">
      <div class="demo-line">
        <p>使用场景：在表格中的按钮</p>
        <p class="black-4">按钮特点：type为 text </p>
        <base-table
          :columns.sync="columns"
          :params.sync="form"
          :table-props="tableProps"
          ref="table"
          simple
        >
          <template v-slot:op="scope">
            <el-button type="text">推荐</el-button>
          </template>
        </base-table>
      </div>
    </div>
    <h3>3. 弹出层中底部的按钮</h3>
    <div class="demo-box">
      <div class="demo-line">
        <p>使用场景：在弹出层底部使用的按钮</p>
        <p class="black-4">按钮特点：type为 dp ，意为 dialogPrimary </p>
        <el-button @click="() => { this.visible = true;this.useCustomFooter = false; }">打开弹框，使用默认底部</el-button>
        <el-button @click="() => { this.visible = true;this.useCustomFooter = true; }">打开弹框，使用自定义底部</el-button>
        <base-dialog :props="{title: '弹出层底部按钮样式demo'}" :visible.sync="visible" @ok="visible = false">
          <template slot="footer" v-if="useCustomFooter">
            <el-button>取消</el-button>
            <!--            这里展示了如何在弹窗中使用底部按钮的样式 这种情况用的少，一般用默认的即可-->
            <el-button @click="visible = false" type="dp">确认</el-button>
          </template>
        </base-dialog>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Column } from '@/components/common-table/table.model'

  @Component({})
  export default class ButtonDemo extends Vue {
    public tableProps = {
      data: [
        {
          name: 'name',
          id: 'id',
        },
      ],
    }
    public columns: Column[] = [
      {
        prop: 'name',
        label: '名称',
      },
      {
        prop: 'op',
        label: '',
        contentSlot: 'op',
      },
    ]
    public form = {}
    public visible = false
    public useCustomFooter = false
  }
</script>
<style lang="less" scoped>

</style>
