import Vue from 'vue'
import VueI18n from 'vue-i18n'
import cn from '@/assets/i18n/cn'
import { lg, ls } from '@/util/common/fns/fns'
import { KEY_LANG } from '@/models/project/local-storage-keys/keys'
import axios from 'axios'

Vue.use(VueI18n)
export const i18n = new VueI18n({
  locale: getLanguage(),
  fallbackLocale: 'cn',
  silentTranslationWarn: true,
  messages: { cn },
})

const loadedLanguages = [ 'cn' ]

export function getLanguage () {
  return lg(KEY_LANG) || 'cn'
}

export function setI18nLanguage (lang: string) {
  ls(KEY_LANG, lang)
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  // @ts-ignore
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync (lang: string) {
  if (i18n.locale !== null) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `@/assets/i18n/${ lang }`).then(msgs => {
        i18n.setLocaleMessage(lang, msgs.default)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}
