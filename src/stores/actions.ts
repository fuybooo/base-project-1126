import Vue from 'vue'
import { dic, getUser } from '@/stores/action-types'
import { dic as mDic, getUser as mGetUser } from '@/stores/mutation-types'
import { Commit } from 'vuex'
import { State } from '@/stores/states'
import { isEmpty } from '@/util/common/fns/fns'

export default {
  async [dic] ({ commit, state }: { commit: Commit, state: State }, dicType: string) {
    // @ts-ignore
    if (!state.dic[dicType]) {
      const res = await Vue.prototype.$req(Vue.prototype.$urls.dictionary.listType, { type: dicType })
      commit(mDic, { dicType, list: res.data.results })
    }
  },
  async [getUser] ({ commit, state }: { commit: Commit, state: State }) {
    if (isEmpty(state.user)) {
      const res = await Vue.prototype.$req(Vue.prototype.$urls.login.hasLogin)
      commit(mGetUser, res.data)
    }
  },
}
