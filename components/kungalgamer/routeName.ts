interface nav {
  index: number
  name: string
  router: string
  permission: number[]
}

export const navBarRoute: nav[] = [
  {
    index: 1,
    name: 'profile',
    router: 'info',
    permission: [1, 2, 3, 4],
  },
  {
    index: 2,
    name: 'settings',
    router: 'settings',
    permission: [4],
  },
  {
    index: 3,
    name: 'email',
    router: 'password',
    permission: [4],
  },
  {
    index: 4,
    name: 'published',
    router: 'published-topic',
    permission: [1, 2, 3, 4],
  },
  {
    index: 5,
    name: 'liked',
    router: 'liked-topic',
    permission: [2, 3, 4],
  },
  {
    index: 6,
    name: 'upvote',
    router: 'upvote-topic',
    permission: [2, 3, 4],
  },
  {
    index: 7,
    name: 'reply',
    router: 'reply',
    permission: [1, 2, 3, 4],
  },
  {
    index: 8,
    name: 'comment',
    router: 'comment',
    permission: [1, 2, 3, 4],
  },
]
