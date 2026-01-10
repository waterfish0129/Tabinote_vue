import zhTW from '@/locales/zh-TW/common'
import en from '@/locales/en/common'
import jp from '@/locales/jp/common'

import { createI18n } from 'vue-i18n'

const SUPPORT_LOCALES = ['zh-TW', 'en', 'jp'] as const

export const i18n = createI18n({
  legacy: false,
  locale: SUPPORT_LOCALES[0],
  fallbackLocale: 'en',
  messages: {
    'zh-TW': zhTW,
    en,
    jp,
  },
})

export type SupportLocale = (typeof SUPPORT_LOCALES)[number]
