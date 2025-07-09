import { defineStore } from 'pinia'
import type { UserStore } from '../types/user'
import type { LoginResponseData } from '~/types/api/user'

export const usePersistUserStore = defineStore('KUNGalgameUser', {
  persist: true,
  state: (): UserStore => ({
    id: 0,
    name: '',
    avatar: '',
    avatarMin: '',
    moemoepoint: 0,
    role: 0,
    isCheckIn: false
  }),
  actions: {
    setUserInfo(user: LoginResponseData) {
      this.id = user.id
      this.name = user.name
      this.avatar = user.avatar
      this.avatarMin = user.avatar.replace(/\.webp$/, '-100.webp')
      this.moemoepoint = user.moemoepoint
      this.role = user.role
    }
  }
})
