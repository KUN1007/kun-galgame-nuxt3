import { reactive } from 'vue'

interface Question {
  id: number
  text: string
  options: string[]
  correctOption: string
  isHard: boolean
}

export const questionsCN: Question[] = reactive([
  {
    id: 1,
    text: '下列哪个不是《千恋＊万花》中的角色？',
    options: ['丛雨', '芦花', '芳乃', '七海'],
    correctOption: '七海',
    isHard: false
  },
  {
    id: 2,
    text: '《夏日口袋》中紬文德斯的发色是？',
    options: ['红色', '金色', '紫色', '白色'],
    correctOption: '金色',
    isHard: false
  },
  {
    id: 3,
    text: '`Galgame`被称为？',
    options: ['Gay game', '美少女游戏', '乙女游戏', '啊这可海星'],
    correctOption: '美少女游戏',
    isHard: false
  },
  {
    id: 4,
    text: '下列哪个不属于五彩斑斓系列？',
    options: [
      '五彩斑斓的世界',
      '五彩斑斓的曙光',
      '红瞳映入的世界',
      '五彩斑斓的未来'
    ],
    correctOption: '五彩斑斓的未来',
    isHard: false
  },
  {
    id: 5,
    text: '以下哪部作品中男主没有女装？',
    options: ['近月少女的礼仪', '少女 * 领域', '美少女万华镜1', '我们没有翅膀'],
    correctOption: '美少女万华镜1',
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
    text: '以下哪部作品没有可推萝莉?',
    options: [
      '永不枯萎的世界与终结之花',
      '保健室的老师与沉迷吹泡泡的助手',
      '放课后的灰姑娘女孩',
      '糖调! -sugarfull tempering-'
    ],
    correctOption: '放课后的灰姑娘女孩',
    isHard: false
  },
  {
    id: 8,
    text: '以下哪部作品没有可推白毛?',
    options: [
      '9-nine-天色天歌天籁音',
      '恋爱定位',
      '初雪樱',
      '奇异恩典圣夜的小镇'
    ],
    correctOption: '恋爱定位',
    isHard: false
  },
  {
    id: 9,
    text: '以下哪个作品没有解放乳袋的功能?',
    options: [
      '图谋不轨的恋爱',
      '性癖開放宣言',
      'PRIMAL×HEARTS',
      'PRIMAL×HEARTS 2'
    ],
    correctOption: '图谋不轨的恋爱',
    isHard: true
  },
  {
    id: 10,
    text: '《想要传达给你的爱恋》结尾 CG 中男主眼睛睁开了吗?',
    options: ['睁开了', '没睁开', '被星奏吻醒了', '没有这张 CG'],
    correctOption: '没睁开',
    isHard: true
  },
  {
    id: 11,
    text: '以下哪个作品 CG 和人物立绘均没有动态?',
    options: ['虜ノ锁', '世界上最 NG 的恋爱', '輪舞曲 Duo', 'Qbit01T'],
    correctOption: 'Qbit01T',
    isHard: true
  },
  {
    id: 11,
    text: '以下哪个作品中出现过“草雉直哉”这个名字?',
    options: [
      '向日葵的教会与长长的暑假',
      '突然之间发现我已恋上你',
      '超极糖果',
      'H2O 赤砂印记'
    ],
    correctOption: 'H2O 赤砂印记',
    isHard: true
  },
  {
    id: 11,
    text: '以下哪个作品不是真·中二社的?',
    options: ['Seabed', 'KKK', '八命阵', '神怒之日'],
    correctOption: 'Seabed',
    isHard: true
  }
])
