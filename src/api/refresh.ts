import axios from 'axios'

let isRefreshing = false
let queue: ((token: string) => void)[] = []

function resolveQueue(token: string) {
  queue.forEach((cb) => cb(token))
  queue = []
}

// =========================================
// 多個 API 同時 401
// 只會 refresh 一次
// 其他請求排隊等新 token

export async function refreshTokenRequest(): Promise<string> {
  if (isRefreshing) {
    return new Promise((resolve) => {
      queue.push(resolve)
    })
  }

  isRefreshing = true

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/v1/auth/refresh`,
      {},
      { withCredentials: true }, //讓 cookie 帶上
    )

    const newAccessToken = res.data.data.accessToken
    resolveQueue(newAccessToken)
    return newAccessToken
  } finally {
    isRefreshing = false
  }
}
