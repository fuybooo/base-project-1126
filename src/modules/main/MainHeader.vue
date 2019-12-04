<template>
  <el-row align="middle" justify="center" type="flex">
    <el-col :span="18">
      <div class="logo">
        <div class="title">
          <img @click="toHome" alt="" class="img" src="">
          <span @click="toHome" class="h1">管理系统</span>
        </div>
      </div>
    </el-col>
    <el-col :span="6" class="tar">
      <span @click="openMessage" class="yygf-nomessage mr20 cp" title="消息中心"></span>
      <span @click="openPersonal" class="cp mr20" title="个人中心">
        <img alt="头像" class="tx-img" src="../../assets/img/user.png">
        <span class="black-2">Fuybooo</span>
      </span>
      <span @click="logout" class="yygf-letitgo cp" title="退出"></span>
    </el-col>
  </el-row>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { dc, lr } from '@/util/common/fns/fns'

  @Component({})
  export default class MainHeader extends Vue {
    public created () {
    }

    public openMessage () {
      this.$router.push({ name: 'messageList' })
    }

    public openPersonal () {
      this.$router.push({ name: 'personalInfo' })
    }

    public logout () {
      this.$confirm('是否确定退出系统?', '提示', {
        type: 'warning',
      })
        .then(() => {
          // 执行退出操作
          dc()
          lr()
          this.$router.push({ name: 'login' })
        }).catch(() => {
      })
    }

    public toHome () {
      this.$router.push({ name: 'home' })
    }
  }
</script>
<style lang="less" scoped>
</style>
