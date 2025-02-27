import { defineStore } from 'pinia'
import type { KUNGalgamerStore } from '../types/kungalgamer'
import type { LoginResponseData } from '~/types/api/user'

export const usePersistUserStore = defineStore('KUNGalgameUser', {
  persist: true,
  state: (): KUNGalgamerStore => ({
    uid: 0,
    name: '',
    avatar: '',
    avatarMin: '',
    moemoepoint: 0,
    moemoeAccessToken: '',
    roles: 0
  }),
  actions: {
    setUserInfo(user: LoginResponseData) {
      this.uid = user.uid
      this.name = user.name
      this.avatar = user.avatar
      this.avatarMin = user.avatar.replace(/\.webp$/, '-100.webp')
      this.moemoepoint = user.moemoepoint
      this.roles = user.roles
      this.moemoeAccessToken = user.token
    },

    setToken(moemoeAccessToken: string) {
      this.moemoeAccessToken = moemoeAccessToken
    },

    getToken() {
      return this.moemoeAccessToken
    },

    removeToken() {
      this.moemoeAccessToken = ''
    }
  }
})
