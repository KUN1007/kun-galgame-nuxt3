export interface Nav {
  name: string
  router?: string
  collapsed?: boolean
  permission?: number[]
  child?: Nav[]
}

export const navBarRoute: Ref<Nav[]> = ref([
  {
    name: 'profile',
    router: 'info',
    permission: [1, 2, 3, 4]
  },
  {
    name: 'setting',
    router: 'setting',
    permission: [4]
  },
  {
    name: 'email',
    router: 'email',
    permission: [4]
  },
  {
    name: 'password',
    router: 'password',
    permission: [4]
  },
  {
    name: 'topic',
    permission: [1, 2, 3, 4],
    router: 'topic/publish'
  },
  {
    name: 'galgame',
    permission: [1, 2, 3, 4],
    router: 'galgame/publish'
  },
  {
    name: 'reply',
    router: 'reply',
    permission: [1, 2, 3, 4]
  },
  {
    name: 'comment',
    router: 'comment',
    permission: [1, 2, 3, 4]
  }
])
