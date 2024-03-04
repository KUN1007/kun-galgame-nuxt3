interface topBar {
  index: number
  name: string
  router: string
}

// Be sure to include '/' here, or child routes may have issues!!!
export const topBarItem: topBar[] = [
  { index: 1, name: 'pool', router: '/pool' },
  { index: 2, name: 'create', router: '/edit' },
  { index: 3, name: 'technique', router: '/technique' },
  { index: 4, name: 'about', router: '/kungalgame' },
  { index: 5, name: 'return', router: '/' }
]
