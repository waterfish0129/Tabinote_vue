import http from './http'

export function getUserProfile() {
  return http.get('/v1/auth/me')
}
export function login(idToken: string) {
  return http.post('/v1/auth/google', { idToken })
}
export function logout() {
  return http.post('/v1/auth/logout')
}
