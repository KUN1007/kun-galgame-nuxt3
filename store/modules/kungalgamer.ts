/*
User Information Storage
*/
import { defineStore } from 'pinia'
import type { KUNGalgamerStore } from '../types/kungalgamer'

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
  actions: {},
})
