/// <reference types="vite/client" />
import zhTW from '@/locales/zh-TW/common'

export type MessageSchema = typeof zhTW

declare module 'vue-i18n' {
  export type DefineLocaleMessage = MessageSchema
}
