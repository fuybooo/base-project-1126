<template>
  <el-select :placeholder="$t('common.pleaseSelect')" @change="changeLang" class="lang-setting-select" v-model="value">
    <el-option
      :key="item.value"
      :label="item.label"
      :value="item.value"
      v-for="item in options">
    </el-option>
  </el-select>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { getLanguage, loadLanguageAsync } from '@/config/i18n-config'
  import { langList } from '@/models/common/models'
  import { setTitle } from '@/router/router'

  @Component({})
  export default class LangSetting extends Vue {
    public value = getLanguage()
    public options = langList

    public changeLang (val: string) {
      loadLanguageAsync(val).then(() => setTitle(this.$route))
    }
  }
</script>
<style lang="less">
</style>
