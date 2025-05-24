import { reactive } from 'vue'

export interface Question {
  id: number
  text: string
  options: string[]
  correctOption: string
  isHard: boolean
}

export const questionsJP: Question[] = reactive([
  {
    id: 1,
    text: '次のうち、「千恋*万花」に登場しないキャラクターはどれですか？',
    options: ['丛雨', '芦花', '芦花', '七海'],
    correctOption: '七海',
    isHard: false
  },
  {
    id: 2,
    text: '「Summer Pockets REFLECTION BLUE」に登場する「紬 ヴェンダース」の髪色は?',
    options: ['赤', '金', '紫', '白'],
    correctOption: '金',
    isHard: false
  },
  {
    id: 3,
    text: '「ビジュアルノベル」は何として知られていますか？',
    options: ['ゲイゲーム', 'ギャルゲー', '乙女ゲーム', 'ああ、これはヒトデだ'],
    correctOption: 'ギャルゲー',
    isHard: false
  },
  {
    id: 4,
    text: '次のうち、「いろとりどり」シリーズに含まれない作品はどれですか？',
    options: [
      'いろとりどりのセカイ',
      'いろとりどりのヒカリ',
      '赤い瞳に映るセカイ',
      'いろとりどりの未来'
    ],
    correctOption: 'いろとりどりの未来',
    isHard: false
  },
  {
    id: 5,
    text: '次のゲームのうち、男主人公が女装しない作品はどれですか？',
    options: [
      '月に寄りそう乙女の作法',
      'オトメ＊ドメイン',
      '美少女万華鏡 1',
      '俺たちに翼はない'
    ],
    correctOption: '美少女万華鏡 1',
    isHard: false
  },
  {
    id: 6,
    text: '次のゲームのうち、「SMEE」が制作したのはどれですか?',
    options: ['~フレラバ~', 'D.S. -Dal Segno-', 'Eden*', 'LOOPERS'],
    correctOption: '~フレラバ~',
    isHard: false
  },
  {
    id: 7,
    text: '次の作品のうち、攻略可能なロリキャラが登場しない作品はどれですか？',
    options: [
      '枯れない世界と終わる花',
      '保健室のセンセーとシャボン玉中毒の助手',
      '放課後シンデレラ',
      'しゅがてん! -sugarfull tempering-'
    ],
    correctOption: '放課後シンデレラ',
    isHard: false
  },
  {
    id: 8,
    text: '次の作品のうち、攻略可能な白髪のキャラが登場しない作品はどれですか？',
    options: [
      '9-nine-そらいろそらうたそらのおと',
      'ろけらぶ',
      'はつゆきさくら',
      'アメイジング・グレイス -What color is your attribute?-'
    ],
    correctOption: 'ろけらぶ',
    isHard: false
  },
  {
    id: 9,
    text: '次の作品のうち、「胸の解放」要素がない作品はどれですか？',
    options: [
      '二人と始める打算的なラブコメ',
      'ももいろ性癖開放宣言！',
      'PRIMAL×HEARTS',
      'PRIMAL×HEARTS 2'
    ],
    correctOption: '二人と始める打算的なラブコメ',
    isHard: true
  },
  {
    id: 10,
    text: '「恋×シンアイ彼女」のエンディングCGで、主人公は目を開けていますか？',
    options: [
      'はい、目を開けています',
      'いいえ、目を開けていません',
      'セナにキスで起こされる',
      'このシーンのCGはありません'
    ],
    correctOption: 'いいえ、目を開けていません',
    isHard: true
  },
  {
    id: 11,
    text: '次の作品のうち、アニメーションなしのCGとキャラクターイラストがあるのはどれですか？',
    options: [
      '虜ノ鎖',
      '世界でいちばんNG（だめ）な恋',
      '輪舞曲Duo -夜明けのフォルテシモ-',
      'Qbit01T'
    ],
    correctOption: 'Qbit01T',
    isHard: true
  },
  {
    id: 11,
    text: '「草薙 直哉」の名前が登場する作品はどれですか？',
    options: [
      '向日葵の教会と長い夏休み',
      'いきなりあなたに恋している',
      'しゅぷれ～むキャンディ～',
      'H2O -FOOTPRINTS IN THE SAND-'
    ],
    correctOption: 'H2O -FOOTPRINTS IN THE SAND-',
    isHard: true
  },
  {
    id: 11,
    text: '次の作品のうち、lightの作品ではないのはどれですか？',
    options: ['Seabed', 'KKK', '八命陣', 'Dies irae'],
    correctOption: 'Seabed',
    isHard: true
  }
])
