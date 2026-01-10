import Cookies from 'js-cookie'

const tools = {
  Router: {},
  Store: {},
  // LocalStorage: {
  //   setItem<T>(key: string, value: T) {
  //     localStorage.setItem(key, JSON.stringify(value))
  //   },
  //   getItem(key: string) {
  //     const v = localStorage.getItem(key)
  //     try {
  //       return JSON.parse(v as string)
  //     } catch {
  //       return v
  //     }
  //   },
  // },
  Cookie: {
    setItem(key: string, value: string) {
      Cookies.set(key, value, { expires: 30 })
    },
    getItem(key: string, defaultValue?: string) {
      const v = Cookies.get(key) || defaultValue
      try {
        return JSON.parse(v as string)
      } catch {
        return v
      }
    },
    removeItem(key: string) {
      Cookies.remove(key)
    },
  },
  Time: {},
  Dom: {},
}

export type tools = typeof tools

export default tools
