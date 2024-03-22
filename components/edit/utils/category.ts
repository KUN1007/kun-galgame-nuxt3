export interface Category {
  index: number
  name: string
  options: string[]
}

export const galgameSection = [
  'g-chatting',
  'g-walkthrough',
  'g-seeking',
  'g-news',
  'g-releases',
  'g-other'
]

export const techniqueSection = [
  't-crack',
  't-languages',
  't-practical',
  't-linux',
  't-web',
  't-android',
  't-adobe',
  't-ai',
  't-algorithm',
  't-other'
]

export const otherSection = [
  'o-anime',
  'o-comics',
  'o-music',
  'o-novel',
  'o-other'
]

export const iconMap: Record<string, string> = {
  g: 'lucide:gamepad-2',
  t: 'lucide:drafting-compass',
  o: 'lucide:circle-ellipsis'
}

export const topicCategory: Category[] = [
  {
    index: 1,
    name: 'Galgame',
    options: galgameSection
  },
  {
    index: 2,
    name: 'Technique',
    options: techniqueSection
  },
  {
    index: 3,
    name: 'Others',
    options: otherSection
  }
]
