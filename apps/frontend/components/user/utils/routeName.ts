export interface Nav {
  name: string
  router: string
  redirect?: string
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
    redirect: 'topic/publish',
    router: 'topic'
  },
  {
    name: 'galgame',
    permission: [1, 2, 3, 4],
    redirect: 'galgame/publish',
    router: 'galgame'
  },
  {
    name: 'resource',
    permission: [1, 2, 3, 4],
    redirect: 'resource/valid',
    router: 'resource'
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
