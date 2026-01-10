import { defineStore } from 'pinia'
import { login, getUserProfile } from '@/api/user'
import Cookies from 'js-cookie'
import type { UserProfile } from '@/types/user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null as string | null,
    userProfile: null as UserProfile | null,
    loadingUser: false,
  }),
  persist: false, //重新整理後要不要保持原本資料
  actions: {
    /** Google login 成功後呼叫 */
    async loginWithGoogle(idToken: string) {
      const res = await login(idToken)
      this.setAccessToken(res.data.data.accessToken)
    },

    async fetchUser() {
      if (!this.accessToken) return

      this.loadingUser = true
      getUserProfile()
        .then((res) => {
          this.userProfile = res.data.data
        })
        .catch(() => {})
        .finally(() => {
          this.loadingUser = false
        })
    },
    setAccessToken(token: string | null) {
      this.accessToken = token
      if (token) {
        this.fetchUser()
      } else {
        this.userProfile = null
      }
    },
    clearToken() {
      this.accessToken = null
      this.userProfile = null
    },
    logout() {
      //清空Pinia狀態
      this.$reset()

      //刪除Cookie
      Cookies.remove('refresh_token', { path: '/' })

      //導向登入頁
      //router.push('/login')
    },
  },
})
