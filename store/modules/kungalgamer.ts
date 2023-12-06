import { defineStore } from 'pinia'
import type { KUNGalgamerStore } from '../types/kungalgamer'
import type { LoginRequestData, LoginResponseData } from '~/types/api/user'

const loginURLs = {
  login: `/user/login`,
  register: `/user/register`,
  verificationCode: `/auth/email/code`,
  refreshToken: `/auth/token/refresh`,
}

export const useKUNGalgameUserStore = defineStore({
  id: 'KUNGalgameUser',
  persist: true,
  state: (): KUNGalgamerStore => ({
    uid: 0,
    name: '',
    avatar: '',
    avatarMin: '',
    moemoepoint: 0,
    moemoeAccessToken: '',
    roles: 0,
  }),
  getters: {},
  actions: {
    setUserInfo(
      uid: number,
      name: string,
      avatar: string,
      moemoepoint: number,
      roles: number
    ): void {
      this.uid = uid
      this.name = name
      this.avatar = avatar
      this.avatarMin = avatar.replace(/\.webp$/, '-100.webp')
      this.moemoepoint = moemoepoint
      this.roles = roles
    },

    setToken(moemoeAccessToken: string) {
      this.moemoeAccessToken = moemoeAccessToken
    },

    getToken() {
      return this.moemoeAccessToken
    },

    removeToken() {
      this.moemoeAccessToken = ''
    },

    async login(request: LoginRequestData) {
      const res = await fetchPost(loginURLs.login, request)
      return res
    },
  },
})
