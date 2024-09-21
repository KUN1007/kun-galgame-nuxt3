import { reactive } from 'vue'

interface Question {
  id: number
  text: string
  options: string[]
  correctOption: string
  isHard: boolean
}

export const questionsTW: Question[] = reactive([
  {
    id: 1,
    text: '下列哪個不是《仟戀＊萬花》中的角色？',
    options: ['丛雨', '蘆花', '芳乃', '七海'],
    correctOption: '七海',
    isHard: false
  },
  {
    id: 2,
    text: '《夏日口袋》中紬文德斯的發色是？',
    options: ['紅色', '金色', '紫色', '白色'],
    correctOption: '金色',
    isHard: false
  },
  {
    id: 3,
    text: '`Galgame`被稱為？',
    options: ['Gay game', '美少女遊戲', '乙女遊戲', '啊這可海星'],
    correctOption: '美少女遊戲',
    isHard: false
  },
  {
    id: 4,
    text: '下列哪個不屬於五彩斑斕繫列？',
    options: [
      '五彩斑斕的世界',
      '五彩斑斕的曙光',
      '紅瞳映入的世界',
      '五彩斑斕的未來'
    ],
    correctOption: '五彩斑斕的未來',
    isHard: false
  },
  {
    id: 5,
    text: '以下哪部作品中男主沒有女裝？',
    options: ['近月少女的禮儀', '少女 * 領域', '美少女萬華鏡1', '我們沒有翅膀'],
    correctOption: '美少女萬華鏡1',
    isHard: false
  },
  {
    id: 6,
    text: '以下哪部作品是《SMEE》制作的?',
    options: ['~Friend to Lover~', 'Dal Segno', 'Eden*', 'LOOPERS'],
    correctOption: '~Friend to Lover~',
    isHard: false
  },
  {
    id: 7,
    text: '以下哪部作品沒有可推蘿莉?',
    options: [
      '永不枯萎的世界與終結之花',
      '保健室的老師與沈迷吹泡泡的助手',
      '放課後的灰姑娘女孩',
      '糖調! -sugarfull tempering-'
    ],
    correctOption: '放課後的灰姑娘女孩',
    isHard: false
  },
  {
    id: 8,
    text: '以下哪部作品沒有可推白毛?',
    options: [
      '9-nine-天色天歌天籟音',
      '戀愛定位',
      '初雪櫻',
      '奇異恩典聖夜的小鎮'
    ],
    correctOption: '戀愛定位',
    isHard: false
  },
  {
    id: 9,
    text: '以下哪個作品沒有解放乳袋的功能?',
    options: [
      '圖謀不軌的戀愛',
      '性癖開放宣言',
      'PRIMAL×HEARTS',
      'PRIMAL×HEARTS 2'
    ],
    correctOption: '圖謀不軌的戀愛',
    isHard: true
  },
  {
    id: 10,
    text: '《想要傳達給妳的愛戀》結尾 CG 中男主眼睛睜開了嗎?',
    options: ['睜開了', '沒睜開', '被星奏吻醒了', '沒有這張 CG'],
    correctOption: '沒睜開',
    isHard: true
  },
  {
    id: 11,
    text: '以下哪個作品 CG 和人物立繪均沒有動態?',
    options: ['虜ノ鎖', '世界上最 NG 的戀愛', '輪舞曲 Duo', 'Qbit01T'],
    correctOption: 'Qbit01T',
    isHard: true
  },
  {
    id: 11,
    text: '以下哪個作品中出現過“草雉直哉”這個名字?',
    options: [
      '嚮日葵的教會與長長的暑假',
      '突然之間發現我已戀上妳',
      '超極糖果',
      'H2O 赤砂印記'
    ],
    correctOption: 'H2O 赤砂印記',
    isHard: true
  },
  {
    id: 11,
    text: '以下哪個作品不是真·中二社的?',
    options: ['Seabed', 'KKK', '八命陣', '神怒之日'],
    correctOption: 'Seabed',
    isHard: true
  }
])
