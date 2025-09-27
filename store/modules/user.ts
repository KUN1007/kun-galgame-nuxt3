import { defineStore } from 'pinia'
import type { UserStore } from '../types/user'

export const usePersistUserStore = defineStore('KUNGalgameUser', {
  persist: true,
  state: (): UserStore => ({
    id: 0,
    name: '',
    avatar: '',
    avatarMin: '',
    moemoepoint: 0,
    role: 0,
    isCheckIn: false,
    dailyToolsetUploadCount: 0
  }),
  actions: {
    setUserInfo(user: UserStore) {
      this.id = user.id
      this.name = user.name
      this.avatar = user.avatar
      this.avatarMin = user.avatar.replace(/\.webp$/, '-100.webp')
      this.moemoepoint = user.moemoepoint
      this.role = user.role
      this.isCheckIn = user.isCheckIn
      this.dailyToolsetUploadCount = user.dailyToolsetUploadCount
    }
  }
})
