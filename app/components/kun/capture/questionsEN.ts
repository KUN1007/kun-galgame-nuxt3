import { reactive } from 'vue'

export interface Question {
  id: number
  text: string
  options: string[]
  correctOption: string
  isHard: boolean
}

export const questionsEN: Question[] = reactive([
  {
    id: 1,
    text: 'Which one of the following is not a character in "Senren * Banka"?',
    options: ['Murasame', 'Roka', 'Yoshino', 'Nanami'],
    correctOption: 'Nanami',
    isHard: false
  },
  {
    id: 2,
    text: 'What is the hair color of Tsumugi Wenders in "Summer Pockets REFLECTION BLUE"?',
    options: ['Red', 'Gold', 'Purple', 'White'],
    correctOption: 'Gold',
    isHard: false
  },
  {
    id: 3,
    text: 'What is "Visual Novel" known as?',
    options: ['Gay game', 'Galgame', 'Otome game', 'Ah, this is a starfish'],
    correctOption: 'Galgame',
    isHard: false
  },
  {
    id: 4,
    text: 'Which of the following does not belong to the "Irotoridori" series?',
    options: [
      'Irotoridori no Sekai',
      'Irotoridori no Hikari',
      'Akai Hitomi ni Utsuru Sekai',
      'Irotoridori no Mirai'
    ],
    correctOption: 'Irotoridori no Mirai',
    isHard: false
  },
  {
    id: 5,
    text: 'In which of the following games does the male protagonist not cross-dress?',
    options: [
      'Tsuki ni Yorisou Otome no Sahou',
      'Otome * Domain',
      'Bishoujo Mangekyou 1',
      'Ore-tachi ni Tsubasa wa Nai'
    ],
    correctOption: 'Bishoujo Mangekyou 1',
    isHard: false
  },
  {
    id: 6,
    text: 'Which of the following games was produced by "SMEE"?',
    options: ['~Friend to Lover~', 'Dal Segno', 'Eden*', 'LOOPERS'],
    correctOption: '~Friend to Lover~',
    isHard: false
  },
  {
    id: 7,
    text: 'Which of the following works does not feature a loli character can be romanced?',
    options: [
      'Karenai Sekai to Owaru Hana',
      'Hokenshitsu no Sensei to Shabondama Chuudoku no Joshu',
      'Houkago Cinderella',
      'Shugaten! -sugarfull tempering-'
    ],
    correctOption: 'Houkago Cinderella',
    isHard: false
  },
  {
    id: 8,
    text: 'Which of the following works does not feature a character can be romanced with white hair?',
    options: [
      '9-nine- Sorairo Sorauta Soranooto',
      'Loca Love',
      'Hatsuyuki Sakura',
      'Amazing Grace -What color is your attribute?-'
    ],
    correctOption: 'Loca Love',
    isHard: false
  },
  {
    id: 9,
    text: 'Which of the following works does not have the feature of freeing the chest?',
    options: [
      'Kimi to Hajimeru Dasanteki na Love Come',
      'Momoiro Seiheki Kaihou Sengen!',
      'PRIMAL×HEARTS',
      'PRIMAL×HEARTS 2'
    ],
    correctOption: 'Kimi to Hajimeru Dasanteki na Love Come',
    isHard: true
  },
  {
    id: 10,
    text: 'In the ending CG of "Koi x Shin Ai Kanojo" does the male protagonist open his eyes?',
    options: [
      'Yes, he opens his eyes',
      "No, he doesn't open his eyes",
      'Woken up by Sena with a kiss',
      'There is no CG with this scene'
    ],
    correctOption: "No, he doesn't open his eyes",
    isHard: true
  },
  {
    id: 11,
    text: 'Which of the following works has both CG and character illustrations without animation?',
    options: [
      'Toriko no Kusari',
      'Sekai de Ichiban Dame na Koi',
      'Rondo Duo',
      'Qbit01T'
    ],
    correctOption: 'Qbit01T',
    isHard: true
  },
  {
    id: 11,
    text: 'In which work does the name "Kusanagi Naoya" appear?',
    options: [
      'Himawari no Kyoukai to Nagai Natsuyasumi',
      'Ikinari Anata ni Koishiteiru',
      'Supreme Candy',
      'H2O -FOOTPRINTS IN THE SAND-'
    ],
    correctOption: 'H2O -FOOTPRINTS IN THE SAND-',
    isHard: true
  },
  {
    id: 11,
    text: 'Which of the following works is not from light?',
    options: ['Seabed', 'KKK', 'Hachimyoujin', 'Dies irae'],
    correctOption: 'Seabed',
    isHard: true
  }
])
