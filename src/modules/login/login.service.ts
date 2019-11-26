import { sc } from '@/util/common/fns/fns'
import { KEY_TOKEN, KEY_UID, KEY_USERNAME } from '@/models/project/local-storage-keys/keys'
import { HttpRes } from '@/models/common/models'

export function login (username: string, password: string) {
  // @ts-ignore
  const me = this
  me.$req(me.$urls.login.login, {
    username,
    password,
  }).then((res: HttpRes) => {
    if (res.code === 200) {
      // 设置token 用户信息等
      sc(KEY_TOKEN, res.data.token)
      sc(KEY_UID, res.data.id)
      sc(KEY_USERNAME, username)
      // sc(KEY_POSITION, res.data.position + '') // 1：超级管理员；2：管理员；3：外教；4：助教；5：销售老师；6：运营老师
      // lso(KEY_USER_INFO, {...res.data, position: res.data.position + ''})
      // me.$success(me.$t('login.tip.loginSuccess') as string)
      loginSuccess.bind(me)()
    } else {
      // 登录失败，给出提示
      me.$error(res.msg)
    }
  })
}

export function loginSuccess () {
  // @ts-ignore
  const me = this
  me.$router.push({ name: 'main' })
}
