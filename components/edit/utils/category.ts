export interface Category {
  index: number
  name: string
  i18n: string
  options: string[]
}

export const topicCategory: Category[] = [
  {
    index: 1,
    name: 'Galgame',
    i18n: 'galgameSection',
    options: ['walkthrough', 'chatting', 'seeking', 'news', 'releases', 'other']
  },
  {
    index: 2,
    name: 'Technique',
    i18n: 'techniqueSection',
    options: [
      'crack',
      'languages',
      'practical',
      'linux',
      'web',
      'android',
      'adobe',
      'ai',
      'algorithm',
      'other'
    ]
  },
  {
    index: 3,
    name: 'Others',
    i18n: 'otherSection',
    options: ['anime', 'comics', 'music', 'novel', 'other']
  }
]
