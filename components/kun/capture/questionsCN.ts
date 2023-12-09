import { reactive } from 'vue'

interface Question {
  id: number
  text: string
  options: string[]
  correctOption: string
}

export const questionsCN: Question[] = reactive([
  {
    id: 1,
    text: '下列哪个不是《千恋＊万花》中的角色？',
    options: ['丛雨', '芦花', '芳乃', '七海'],
    correctOption: '七海',
  },
  {
    id: 2,
    text: '《夏日口袋》中紬文德斯的发色是？',
    options: ['红色', '金色', '紫色', '白色'],
    correctOption: '金色',
  },
  {
    id: 3,
    text: '`Galgame`被称为？',
    options: ['Gay game', '美少女游戏', '乙女游戏', '啊这可海星'],
    correctOption: '美少女游戏',
  },
  {
    id: 4,
    text: '下列哪个游戏不属于五彩斑斓系列？',
    options: [
      '五彩斑斓的世界',
      '五彩斑斓的曙光',
      '红瞳映入的世界',
      '五彩斑斓的未来',
    ],
    correctOption: '五彩斑斓的未来',
  },
  {
    id: 5,
    text: '以下哪部作品中男主没有女装？',
    options: ['近月少女的礼仪', '少女 * 领域', '美少女万华镜1', '我们没有翅膀'],
    correctOption: '美少女万华镜1',
  },
  {
    id: 6,
    text: '以下哪个作品是《SMEE》制作的?',
    options: ['~Friend to Lover~', 'Dal Segno', 'Eden*', 'LOOPERS'],
    correctOption: '~Friend to Lover~',
  },
  {
    id: 7,
    text: '鲲可爱吗？',
    options: ['可爱！', '很可爱！', '最可爱了！', '总之就是非常可爱！'],
    correctOption: '总之就是非常可爱！',
  },
])
