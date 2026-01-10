import { defineStore } from 'pinia'
import systemCfg from '@/config/systemConfig'
import type { SystemConfig } from '@/config/systemConfig'

export const useSystemStore = defineStore('system', {
  state: (): SystemConfig => ({
    baseUrl: systemCfg.baseUrl,
    models: systemCfg.models,
  }),

  getters: {
    //獲取系統的配置訊息
    getConfig:
      (state) =>
      <T>(key: keyof SystemConfig): T => {
        return state[key] as T
      },
    //判斷是否啟用了指定的業務模塊
    isModelEnabled:
      (state) =>
      (modelName: string): boolean => {
        return !!state.models.find((item) => item.name === modelName && item.enable)
      },
  },
})
