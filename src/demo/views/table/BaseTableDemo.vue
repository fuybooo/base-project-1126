<template>
  <el-container class="h">
    <el-main class="h">
      <div class="common-query">
        <base-form :schema="schema" @create="handleClick" inline v-model="form"></base-form>
      </div>
      <!--       :fixed-height="50" 在表格中减去合计行的高度-->
      <base-table
        :before-list="beforeList"
        :columns.sync="columns"
        :fixed-height="50"
        :handle-result="handleResult"
        :node-attrs="tableAttrs"
        :params.sync="form"
        :table-props="tableProps"
        :url="url"
        @after-search="afterSearch"
        ref="table"
        @view="viewDetail"
      >
        <template v-slot:address="{row}">
          <span>{{row.address}}</span>
        </template>
        <!--        此处一般不需要作用域，根据需要进行解构 v-slot:ageHeader={column}-->
        <template v-slot:ageHeader>
          <span>不仅仅是标题</span>
        </template>
        <template v-slot:ageContent="{row}">
          <span>不仅仅是内容{{row.age}}</span>
        </template>
        <template v-slot:nameHeader>
          <span>自定义</span>
        </template>
        <template v-slot:genderContent>
          <span>slot genderContent</span>
        </template>
        <template v-slot:op="{row}">
          <el-button @click="toEdit(row)" plain type="primary">编辑</el-button>
          <base-confirm @confirm="del(row)" class="ml10"></base-confirm>
          <!--          <el-button type="danger" plain @click="toDel(row)">删除</el-button>-->
        </template>
      </base-table>
    </el-main>
  </el-container>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Column, columnWidth, defaultFilterSplit } from '@/components/common-table/table.model'
  import { Schema } from '@/components/common-form/form.model'
  import { fb } from '@/util/common/fns/fns-form'
  import format from 'date-fns/format'
  import { HttpRes } from '@/models/common/models'

  @Component({})
  export default class BaseTableDemo extends Vue {
    public input = ''
    public tableKey = ''
    public sumList: any[] = []
    public schema: Schema[] = [
      {
        label: '搜索',
        prop: 'keyword',
      },
      {
        label: '出生日期',
        prop: 'birthday',
        comp: 'date',
        props: {
          type: 'daterange',
        },
        startProp: 'startBirthday',
        endProp: 'endBirthday',
      },
      {
        label: '生日',
        prop: 'birth',
        comp: 'date',
        props: {
          type: 'date',
        },
        aliasProp: 'birthDate',
      },
    ]
    public form = fb(this.schema)
    public url = this.$urls.demo.table.get
    public selectionList: any[] = []
    public columns: Column[] = [
      {
        prop: 'selection',
        props: {
          type: 'selection',
          fixed: 'left',
        },
      },
      {
        prop: 'id',
        label: '编号',
        props: {
          width: columnWidth.w120,
          fixed: 'left',
        },
        content: {
          type: 'link',
          route (row: any) {
            return `/main/demo/form-detail/view/${ row.id }`
          },
        },
      },
      {
        prop: 'name',
        label: '姓名',
        headerSlot: 'nameHeader',
        props: {
          width: columnWidth.w260,
          fixed: 'left',
          formatter (r: any, c: any, v: any, i: number) {
            return v + i
          },
          sortable: 'custom',
          filters: [
            { text: '张三', value: '1' + defaultFilterSplit + 'name' }, // 此处的'name'使用filterProp || prop 分隔符 defaultFilterSplit 一般使用该值即可
            { text: '李四', value: '2' + defaultFilterSplit + 'name' },
          ],
        },
      },
      {
        prop: 'gender',
        label: '性别',
        contentSlot: 'genderContent',
        props: {
          width: columnWidth.w260,
          filters: [
            { text: 1, value: 11 + defaultFilterSplit + 'gender' },
            { text: 2, value: 22 + defaultFilterSplit + 'gender' },
          ],
        },
      },
      {
        prop: 'age',
        label: '年龄',
        contentSlot: 'ageContent',
        headerSlot: 'ageHeader',
        props: {
          width: columnWidth.w260,
        },
      },
      {
        prop: 'customAge',
        label: 'custom年龄',
        props: {
          width: columnWidth.w260,
        },
        content: {
          type: 'event',
        }
      },
      {
        prop: 'address',
        label: '地址',
        // contentSlot: 'address',
        props: {
          width: columnWidth.w260,
          formatter (row, col, value) {
            return value.repeat(4).slice(0, 6)
          },
        },
      },
      {
        prop: 'birthday',
        label: '生日',
        props: {
          formatter (row, col, value) {
            return value ? format(value, 'yyyy-MM-dd HH:mm:ss') : ''
          },
          width: columnWidth.w260,
        },
      },
      {
        label: '操作',
        contentSlot: 'op',
        props: {
          width: columnWidth.w260,
          fixed: 'right',
        },
      },
    ]
    public tableProps: any = {
      'show-summary': true,
      'summary-method' () {
        return [ '合计' ]
      },
    }

    public created () {
      // setTimeout(() => {
      //   console.log('改变tableKey')
      //   this.tableKey = guid()
      // }, 1000)
    }

    /*
    * 在查询完成之后，计算合计行
    * */
    public afterSearch (res: HttpRes) {
      // setTimeout(() => {
      //   console.log('改变tableKey')
      //   this.tableKey = guid()
      // }, 1000)
      console.log('返回结果', res)
      // this.tableKey = guid()
      this.tableProps = {
        'show-summary': true,
        'summary-method' () {
          return [ '合计', 300, 400, 300, 300, 300 ]
        },
      }
    }

    // @Watch('tableKey')
    // public watchTableKey () {
    //   console.log('执行watch')
    //   this.tableProps = {
    //     'show-summary': true,
    //     'summary-method' () {
    //       return ['合计', 300, 400, 300, 300, 300]
    //     }
    //   }
    // }

    // 监听表格的各种事件
    public get tableAttrs () {
      const me = this
      return {
        on: {
          'row-click' () {
            console.log(me)
          },
          'selection-change' (val: any[]) {
            me.selectionList = val
          },
        },
      }
    }

    // public get tableProps () {
    //   const me = this
    //   return me.sumList.length ? {
    //     'show-summary': true,
    //     'summary-method' () {
    //       return me.sumList
    //     }
    //   } : {}
    // }

    public handleResult = (res: HttpRes) => {
      // 请求完成之后改变tableKey
      // setTimeout(() => {
      //   console.log('改变tableKey')
      //   this.tableKey = guid()
      // }, 1000)
      return res.data.results.map((item: any) => ({ ...item, customAge: item.age }))
    }

    public handleClick () {
      this.$router.push({ name: 'demo-form-detail' })
    }

    public del (row: any) {
      this.$req(this.$urls.demo.table.del, { id: row.id }).then((res: HttpRes) => {
        if (res.code === 200) {
          // 从第一页查询
          // this.form._uuid = guid();
          // 从当前页查询
          (this.$refs.table as any).search()
        }
        // 根据请求结果进行提示
        this.$tip(res)
      })
    }

    public toEdit (row: any) {
      this.$router.push({ name: 'demo-form-detail', params: { pattern: 'edit', id: row.id } })
    }

    public beforeList () {
      // 满足某些条件时才进行查询
      return this.form.keyword.length < 10
    }

    public resize () {
      // 如有必要，则重新计算表格高度
      (this.$refs.table as any).resize()
    }
    public viewDetail ({row}: any) {
      console.log(row, this, '触发事件')
    }
  }
</script>
<style lang="less" scoped>

</style>
