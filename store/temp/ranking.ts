import type {
  RankingGetTopicsRequestData,
  RankingGetUserRequestData
} from '~/types/api/ranking'

interface RankingStore {
  topic: RankingGetTopicsRequestData
  user: RankingGetUserRequestData
}

export const useTempRankingStore = defineStore('tempRanking', {
  persist: false,
  state: (): RankingStore => ({
    topic: {
      page: '1',
      limit: '30',
      sortField: 'views',
      sortOrder: 'desc'
    },
    user: {
      page: '1',
      limit: '30',
      sortField: 'moemoepoint',
      sortOrder: 'desc'
    }
  }),
  getters: {},
  actions: {}
})
