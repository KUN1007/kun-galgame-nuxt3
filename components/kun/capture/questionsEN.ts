import { reactive } from 'vue'

export interface Question {
  id: number
  text: string
  options: string[]
  correctOption: string
}

export const questionsEN: Question[] = reactive([
  {
    id: 1,
    text: 'Which one of the following is not a character in "Senren * Banka"?',
    options: ['Murasame', 'Roka', 'Yoshino', 'Nanami'],
    correctOption: 'Nanami',
  },
  {
    id: 2,
    text: 'What is the hair color of Tsumugi Wenders in "	Summer Pockets REFLECTION BLUE"?',
    options: ['Red', 'Gold', 'Purple', 'White'],
    correctOption: 'Gold',
  },
  {
    id: 3,
    text: 'What is "Visual Novel" known as?',
    options: ['Gay game', 'Galgame', 'Otome game', 'Ah, this is a starfish'],
    correctOption: 'Galgame',
  },
  {
    id: 4,
    text: 'Which of the following games does not belong to the "Irotoridori" series?',
    options: [
      'Irotoridori no Sekai',
      'Irotoridori no Hikari',
      'Akai Hitomi ni Utsuru Sekai',
      'Irotoridori no Mirai',
    ],
    correctOption: 'Irotoridori no Mirai',
  },
  {
    id: 5,
    text: 'In which of the following games does the male protagonist not cross-dress?',
    options: [
      'Tsuki ni Yorisou Otome no Sahou',
      'Otome * Domain',
      'Bishoujo Mangekyou 1',
      'Ore-tachi ni Tsubasa wa Nai',
    ],
    correctOption: 'Bishoujo Mangekyou 1',
  },
  {
    id: 6,
    text: 'Which of the following games was produced by "SMEE"?',
    options: ['~Friend to Lover~', 'Dal Segno', 'Eden*', 'LOOPERS'],
    correctOption: '~Friend to Lover~',
  },
  {
    id: 7,
    text: 'Is Kun cute?',
    options: ['Cute!', 'Very cute!', 'Cutest!', 'In short, extremely cute!'],
    correctOption: 'In short, extremely cute!',
  },
])
