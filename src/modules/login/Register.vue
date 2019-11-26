<template>
  <el-container class="h">
    <el-main class="h">
      <el-row class="mt30">
        <el-col :offset="6" :span="8">
          <base-form :inline="false" :schema="schema" :span="24" is-row v-model="form">
            <template v-slot:default>
              <el-col>
                <el-form-item>
                  <el-button @click="register" type="primary">立即注册</el-button>
                  <el-button @click="back">返回</el-button>
                </el-form-item>
              </el-col>
            </template>
          </base-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Schema } from '@/components/common-form/form.model'
  import { fb } from '@/util/common/fns/fns-form'
  import { HttpRes } from '@/models/common/models'
  import { login } from './login.service'

  @Component({})
  export default class Register extends Vue {
    public schema: Schema[] = [
      {
        prop: 'username',
        label: '用户名',
      },
      {
        prop: 'password',
        label: '密码',
        props: {
          type: 'password',
        },
      },
    ]
    public form = fb(this.schema)

    public register () {
      this.$req(this.$urls.login.register, this.form).then((res: HttpRes) => {
        if (res.code === 200) {
          // 注册成功 - 自动登录
          login(this.form.username, this.form.password)
        }
        this.$tip(res)
      })
    }

    public back () {
      this.$router.push({ name: 'login' })
    }
  }
</script>
<style lang="less" scoped>

</style>
