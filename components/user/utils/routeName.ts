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
    name: 'settings',
    router: 'settings',
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
    collapsed: true,
    permission: [1, 2, 3, 4],
    child: [
      {
        name: 'publish',
        router: 'topic/publish',
        permission: [1, 2, 3, 4]
      },
      {
        name: 'like',
        router: 'topic/like',
        permission: [1, 2, 3, 4]
      },
      {
        name: 'upvote',
        router: 'topic/upvote',
        permission: [1, 2, 3, 4]
      },
      {
        name: 'favorite',
        router: 'topic/favorite',
        permission: [1, 2, 3, 4]
      }
    ]
  },
  {
    name: 'galgame',
    collapsed: true,
    permission: [1, 2, 3, 4],
    child: [
      {
        name: 'publish',
        router: 'galgame/publish',
        permission: [1, 2, 3, 4]
      },
      {
        name: 'like',
        router: 'galgame/like',
        permission: [1, 2, 3, 4]
      },
      {
        name: 'favorite',
        router: 'galgame/favorite',
        permission: [1, 2, 3, 4]
      },
      {
        name: 'contribute',
        router: 'galgame/contribute',
        permission: [1, 2, 3, 4]
      }
    ]
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
