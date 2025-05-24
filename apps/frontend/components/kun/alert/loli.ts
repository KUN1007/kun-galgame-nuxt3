import { randomNum } from '~/utils/random'
const getAssetsFile = (name: string) => `/alert/${name}.webp`

const number = randomNum(0, 3)

let loli = ''
let name = ''

if (number === 0) {
  // Actually, her full name is: アーデルハイト・フォン・ベルクシュトラーセ
  name = 'あーちゃん'
  loli = getAssetsFile(name)
} else if (number === 1) {
  name = 'こじかひわ'
  loli = getAssetsFile(name)
} else if (number === 2) {
  name = '雪々'
  loli = getAssetsFile(name)
} else {
  name = '琥珀'
  loli = getAssetsFile(name)
}

export default { loli, name }
