import Vue from 'vue'
import { lgo } from '@/util/common/fns/fns'
import { KEY_USER_INFO } from '@/models/project/local-storage-keys/keys'
import { User } from '@/models/project/user/user'

function getUser (): User {
  return lgo(KEY_USER_INFO) as User
}

Vue.prototype.$getUser = getUser
