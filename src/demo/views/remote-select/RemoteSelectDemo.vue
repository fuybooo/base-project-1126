<template>
  <div class="demo-page">
    <h2>远程选择器 demo</h2>
    <h3>1. 常规用法</h3>
    <div class="demo-box">
      <div class="demo-line">
        <p>使用场景：选择人员【新增模式】</p>
        <div class="demo-value">{{ value11 }}</div>
        <base-remote-select
          @change="changeSelect"
          type="staff"
          v-model="value11"
        ></base-remote-select>
      </div>
      <div class="demo-line">
        <p>使用场景：选择人员【编辑模式】</p>
        <div class="demo-value">{{ value12 }}</div>
        <base-remote-select
          @change="changeSelect"
          type="staff"
          v-model="value12"
        ></base-remote-select>
      </div>
      <div class="demo-line">
        <p>使用场景：选择人员【显示模式】</p>
        <div class="demo-value">{{ value13 }}</div>
        <base-remote-select
          @change="changeSelect"
          pattern="view"
          type="staff"
          v-model="value13"
        ></base-remote-select>
      </div>
    </div>
    <h3>2. 多选用法</h3>
    <div class="demo-box">
      <div class="demo-line">
        <p>使用场景：选择人员【新增模式】</p>
        <p class="black-4">注意：目前只支持 searchAll=true 的情况</p>
        <div class="demo-value">{{ value21 }}</div>
        <base-remote-select
          @change="changeSelect"
          multiple
          type="staff"
          v-model="value21"
        ></base-remote-select>
      </div>
      <div class="demo-line">
        <p>使用场景：回显人员【编辑模式】</p>
        <p class="black-4"></p>
        <div class="demo-value">{{ value22 }}</div>
        <base-remote-select
          @change="changeSelect"
          multiple
          type="staff"
          v-model="value22"
        ></base-remote-select>
      </div>
      <h3>3. 常用示例</h3>
      <div class="demo-box">
        <div class="demo-line">
          <p>使用场景：选择人员，范围：所有</p>
          <div class="demo-value">{{ value31 }}</div>
          <base-remote-select
            @change="changeSelect"
            type="staff"
            v-model="value31"
          ></base-remote-select>
        </div>
        <div class="demo-line">
          <p>使用场景：选择外教</p>
          <div class="demo-value">{{ value31 }}</div>
          <base-remote-select
            :fixed-params="{position: '3'}"
            @change="changeSelect"
            type="staff"
            v-model="value31"
          ></base-remote-select>
        </div>
        <div class="demo-line">
          <p>使用场景：选择助教</p>
          <div class="demo-value">{{ value31 }}</div>
          <base-remote-select
            :fixed-params="{position: '4'}"
            @change="changeSelect"
            type="staff"
            v-model="value31"
          ></base-remote-select>
        </div>
        <div class="demo-line">
          <p>使用场景：选择补课老师</p>
          <div class="demo-value">{{ value31 }}</div>
          <base-remote-select
            :fixed-params="{position: '3,4'}"
            @change="changeSelect"
            type="staff"
            v-model="value31"
          ></base-remote-select>
        </div>
      </div>
      <h3>对比el-select 【这是一个测试版本，不要使用该组件】</h3>
      <div class="demo-box">
        <div class="demo-line">
          <p>使用场景：选择人员</p>
          <el-select
            :filter-method="fm"
            filterable
            v-model="staffValue"
          >
            <el-option
              :key="item.id"
              :label="item.name"
              :value="item.id"
              v-for="item in staffOptions"
            ></el-option>
          </el-select>
        </div>
      </div>
      <h3>使用弱版select 【这是一个测试版本，不要使用该组件】</h3>
      <div class="demo-box">
        <div class="demo-line">
          <p>使用场景：选择人员</p>
          <base-select @change="changeStaff2" v-model="staff2"></base-select>
        </div>
      </div>
      <div class="h1000"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { composeList } from '@/util/common/fns/fns-array'
  import { HttpRes } from '@/models/common/models'
  import pinyin from 'pinyin'
  import BaseSelect from '@/components/common-select/BaseSelect.vue'

  @Component({ components: { BaseSelect } })
  export default class RemoteSelectDemo extends Vue {
    public value11: any = ''
    public value12: any = '1'
    public value13: any = '1'
    public value21: any[] = []
    public value22: any[] = [ '1', '2' ]
    public value23: any[] = [ '1', '2' ]
    public value31: any = ''
    public staffValue = '1'
    public url = this.$urls.staff.queryStaffList
    public staffList = []
    public staffOptions = []
    public staff2 = ''

    public changeSelect (val: any) {
      console.log(val, '监听值的变化')
    }

    public created () {
      // 测试一个函数 composeList
      // console.log(`composeList([['a', 'b', 'c'], ['x', 'y'], ['1', '2']])的执行结果：`, composeList([['a', 'b', 'c'], ['x', 'y'], ['1', '2']]))
      // console.log(compose2Lists(['a', 'b', 'c'], ['x', 'y']), 'result')
      this.$req(this.url).then((res: HttpRes) => {
        if (res.code === 200) {
          this.staffList = res.data.results.map((item: any) => ({
            ...item,
            py: composeList(pinyin(item.name, { style: pinyin.STYLE_FIRST_LETTER, heteronym: true })),
          }))
          this.staffOptions = this.staffList
        }
      })
    }

    public fm (q: string) {
      this.staffOptions = this.staffList.filter((item: any) => {
        return item.name.includes(q) || item.py.some((i: string) => i.includes(q))
      })
    }

    public changeStaff2 (val: any) {
      console.log(val, 'changeStaff2')
    }
  }
</script>
<style lang="less" scoped>
  .h1000 {
    height: 1000px;
  }
</style>
