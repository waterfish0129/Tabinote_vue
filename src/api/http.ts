import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/auth'
import pinia from '@/stores'
import { refreshTokenRequest } from '@/api/refresh'

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
})

/* =========================
   Request Interceptor
========================= */
http.interceptors.request.use((config) => {
  const authStore = useAuthStore(pinia)

  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`
  }

  return config
})

/* =========================
   Response Interceptor
========================= */
http.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const authStore = useAuthStore(pinia)
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean
    }

    // 非 401 直接丟
    if (error.response?.status !== 401) {
      return Promise.reject(error)
    }

    // 已 retry 過，避免無限迴圈
    if (originalRequest._retry) {
      authStore.clearToken()
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      const newToken = await refreshTokenRequest()
      authStore.setAccessToken(newToken)
      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${newToken}`,
      }

      return http(originalRequest)
    } catch (e) {
      authStore.clearToken()
      return Promise.reject(e)
    }
  },
)

export default http
