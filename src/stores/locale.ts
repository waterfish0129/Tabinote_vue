import { defineStore } from 'pinia'
import { i18n } from '@/locales'
import type { SupportLocale } from '@/locales'
import type { MessageSchema } from '@/../env'

const localeModules = import.meta.glob<{
  default: MessageSchema
}>('@/locales/*/common.ts')

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: (localStorage.getItem('locale') as SupportLocale) || 'zh-TW',
  }),

  actions: {
    async setLocale(locale: SupportLocale) {
      if (!i18n.global.availableLocales.includes(locale)) {
        const loader = localeModules[`/src/locales/${locale}/common.ts`]

        if (!loader) {
          throw new Error(`Locale ${locale} not found`)
        }

        const messages = await loader()
        i18n.global.setLocaleMessage(locale, messages.default)
      }

      i18n.global.locale.value = locale
      this.locale = locale
      localStorage.setItem('locale', locale)
    },
  },
})
