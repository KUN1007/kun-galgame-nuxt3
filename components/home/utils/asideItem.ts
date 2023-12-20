interface AsideItem {
  index: number
  name: string
  router: string
}

export const asideItem: AsideItem[] = [
  { index: 1, name: 'update', router: '/update-log' },
  { index: 2, name: 'balance', router: '/balance' },
  { index: 3, name: 'ranking', router: '/ranking' },
  { index: 4, name: 'bylaw', router: '/bylaw' },
  { index: 5, name: 'contact', router: '/contact' },
  { index: 6, name: 'nonMoe', router: '/non-moe' },
]
