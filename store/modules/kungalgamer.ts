import { defineStore } from 'pinia'
import type { KUNGalgamerStore } from '../types/kungalgamer'
import type { LoginResponseData } from '~/types/api/user'

export const useKUNGalgameUserStore = defineStore(
  'KUNGalgameUser',
  () => {
    const kungalgamer: KUNGalgamerStore = {
      uid: 0,
      name: '',
      avatar: '',
      avatarMin: '',
      moemoepoint: 0,
      moemoeAccessToken: '',
      roles: 0,
    }

    const setUserInfo = (user: LoginResponseData) => {
      kungalgamer.uid = user.uid
      kungalgamer.name = user.name
      kungalgamer.avatar = user.avatar
      kungalgamer.avatarMin = user.avatar.replace(/\.webp$/, '-100.webp')
      kungalgamer.moemoepoint = user.moemoepoint
      kungalgamer.roles = user.roles
      kungalgamer.moemoeAccessToken = user.token
    }

    const setToken = (moemoeAccessToken: string) => {
      kungalgamer.moemoeAccessToken = moemoeAccessToken
    }

    const getToken = () => {
      return kungalgamer.moemoeAccessToken
    }

    const removeToken = () => {
      kungalgamer.moemoeAccessToken = ''
    }

    return {
      setUserInfo,
      setToken,
      getToken,
      removeToken,
    }
  },
  { persist: true }
)
