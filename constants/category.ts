export type Category = 'galgame' | 'technique' | 'others'

interface Item {
  value: Category
  textValue: string
}

export const kunCategoryAvailableItem: Item[] = [
  {
    value: 'galgame',
    textValue: 'Galgame'
  },
  {
    value: 'technique',
    textValue: '技术交流'
  },
  {
    value: 'others',
    textValue: '其它'
  }
]
