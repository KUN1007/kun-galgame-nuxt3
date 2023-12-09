// Interface for individual items in the top navigation bar
interface Hamburger {
  index: number
  name: string
  router: string
}

// Items in the top navigation bar
// (be sure to include '/' here, or child routes may have issues!!!)
export const hamburgerItem: Hamburger[] = [
  { index: 1, name: 'pool', router: '/pool' },
  { index: 2, name: 'create', router: '/edit' },
  { index: 3, name: 'technique', router: '/technique' },
  { index: 4, name: 'about', router: '/kungalgame' },
  { index: 5, name: 'ranking', router: '/ranking' },
  { index: 6, name: 'update', router: '/update-log' },
  { index: 7, name: 'bylaw', router: '/bylaw' },
  { index: 8, name: 'balance', router: '/balance' },
  { index: 9, name: 'nonMoe', router: '/non-moe' },
  { index: 10, name: 'thanks', router: '/thanks-list' },
  { index: 11, name: 'join', router: '/contact' },
]
