export interface Plan {
  code: string
  name: string
  startAt: string
  expireAt: string
}

export interface UserProfile {
  id: string
  email: string | null
  emailVerified: boolean
  userName: string | null
  displayName: string | null
  avatarURL: string | null
  role: string | null
  activePlan: Plan
}
