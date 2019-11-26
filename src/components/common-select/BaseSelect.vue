<template>
  <el-select
    :filter-method="fm"
    @change="changeValue"
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
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { composeList } from '@/util/common/fns/fns-array'
  import { HttpRes } from '@/models/common/models'
  import pinyin from 'pinyin'

  @Component({})
  export default class BaseSelect extends Vue {
    @Prop() public value!: any
    public staffValue = this.value
    public staffList = []
    public staffOptions = []

    @Watch('value')
    public watchValue (val: any) {
      this.staffValue = val
    }

    public created () {
      this.$req(this.$urls.staff.queryStaffList).then((res: HttpRes) => {
        if (res.code === 200) {
          this.staffList = res.data.results.map((item: any) => ({
            ...item,
            py: composeList(pinyin(item.name, { style: pinyin.STYLE_FIRST_LETTER, heteronym: true })),
          }))
          this.staffOptions = this.staffList
        }
      })
    }

    public changeValue (val: any) {
      this.$emit('change', val)
      this.$emit('input', val)
    }

    public fm (q: string) {
      this.staffOptions = this.staffList.filter((item: any) => {
        return item.name.includes(q) || item.py.some((i: string) => i.includes(q))
      })
    }
  }
</script>
<style lang="less" scoped>

</style>
