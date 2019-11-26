<template>
  <div>
    <h3>在弹出层中弹出一个确认框</h3>
    <el-button @click="visible = true">打开弹出框</el-button>
    <base-dialog :props="{title: '弹出框'}" :visible.sync="visible" @ok="ok">
    </base-dialog>
    <hr>
    <h3>在弹出层中弹出一个确认框【使用dialog代替】</h3>
    <el-button @click="visible2 = true">打开弹出框</el-button>
    <base-dialog :auto-close="false"
                 :props="{title: '弹出框'}"
                 :visible.sync="visible2" @ok="ok2">
      <!--      <base-dialog :visible.sync="visible3"-->
      <!--                   :props="{title: '内部弹出框', 'append-to-body': true}"-->
      <!--                   @ok="ok3">-->
      <!--        -->
      <!--      </base-dialog>-->
      <base-confirm-dialog :visible.sync="visible4" @ok="ok3">
        是否确认删除
      </base-confirm-dialog>
    </base-dialog>
    <hr>
    <h3>base-confirm-dialog的使用方法，最好只在弹窗中再次弹窗时使用，不要单独使用</h3>
    <el-button @click="visible5 = true">打开弹出框</el-button>
    <base-confirm-dialog :visible.sync="visible5" @ok="ok5">
    </base-confirm-dialog>
    <hr>
    <h3>拦截关闭事件</h3>
    <el-button @click="visible6 = true">打开弹出框</el-button>
    <base-dialog :only-ok="false" :props="dialogProps"
                 :visible.sync="visible6" @cancel="handleCancel">
    </base-dialog>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({})
  export default class Dialog extends Vue {
    public visible = false
    public visible2 = false
    public visible3 = false
    public visible4 = false
    public visible5 = false
    public visible6 = false

    public get dialogProps () {
      const me = this
      return {
        title: '这个弹出框的关闭事件被拦截了',
        'before-close' () {
          me.close()
        },
      }
    }

    public close () {
      console.log('关闭事件被触发', this)
      // 通过判断后决定是否执行
      this.visible6 = false
    }

    public ok () {
      this.$confirm('弹出层中再次弹出确认框', '提示', { type: 'warning' }).then(() => {
        console.log('弹出层中再次弹出确认框')
      }).catch(() => {})
    }

    public ok2 () {
      this.visible4 = true
    }

    public ok3 () {
      this.visible4 = false
    }

    public ok5 () {
      this.visible5 = false
    }

    public handleCancel () {
      this.close()
    }
  }
</script>
<style lang="less" scoped>

</style>
