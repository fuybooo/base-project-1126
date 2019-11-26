<template>
  <el-container class="h">
    <el-main class="h">
      <div class="login-wrap">
        <div class="login-box">
          <div class="login-form">
            <h3 class="title"><img alt="" class="img" src=""><span class="h1">管理系统的名称</span></h3>
            <h4 class="aux-title">后台管理系统</h4>
            <el-form :model="form" :rules="rules" label-position="left" label-width="0px" ref="form" size="medium">
              <el-form-item label="" prop="username">
                <el-input clearable placeholder="账户" prefix-icon="yygf-user" v-model="form.username">
                </el-input>
              </el-form-item>
              <el-form-item class="password-form-item" label="" prop="password">
                <el-input clearable placeholder="密码" prefix-icon="yygf-password" show-password v-model="form.password">
                </el-input>
              </el-form-item>
              <el-form-item class="forgot-form-item" prop="type">
                <el-row :gutter="10">
                  <el-col :offset="12" :span="12" class="tar">
                    <a @click="clickForgot">{{$t('login.forgot')}}</a>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button @click="login()" class="login-button" type="primary">{{$t('sys.login')}}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="footer copyright">
          Copyright © 管理系统
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import './assets/less/index.less'
  import { transferRules } from '@/util/common/fns/fns-form'
  import { gc } from '@/util/common/fns/fns'
  import { KEY_TOKEN } from '@/models/project/local-storage-keys/keys'
  import { login, loginSuccess } from '@/modules/login/login.service'

  const rules = {
    username: [
      { required: true },
    ],
    password: [
      { required: true },
      { max: 18, min: 6 },
    ],
  }
  @Component({})
  export default class Login extends Vue {
    public form = {
      username: 'fyb',
      password: '123456',
      remember: true,
    }
    public rules: any = rules

    public created () {
      if (gc(KEY_TOKEN)) {
        // 发送请求是否已经登录了，若登录了，则直接跳转到登录否则
        loginSuccess.bind(this)()
      }
      this.rules = transferRules.bind(this)(rules)
    }

    public login () {
      (this.$refs.form as any).validate((valid: boolean) => {
        if (valid) {
          login.bind(this)(this.form.username, this.form.password)
        }
      })
    }

    public clickForgot () {
      this.$alert('请联系管理员', '忘记密码')
    }
  }
</script>
