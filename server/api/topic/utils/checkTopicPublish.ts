import { isValidTimestamp } from '~/utils/validate'
import {
  galgameSection,
  techniqueSection,
  otherSection
} from '~/components/edit/utils/category'

const topicCategory = ['Galgame', 'Technique', 'Others']
const topicSection = [...galgameSection, ...techniqueSection, ...otherSection]

export const checkTopicPublish = (
  title: string,
  content: string,
  tags: string[],
  category: string[],
  section: string[],
  edited: number
) => {
  if (!title.trim() || title.trim().length > 40) {
    return 10204
  }

  if (!content.trim() || content.trim().length > 100007) {
    return 10205
  }

  if (!tags.length || tags.length > 7) {
    return 10206
  }

  for (const tag of tags) {
    if (tag.length > 17) {
      return 10502
    }
  }

  if (!category.length || category.length > 2) {
    return 10207
  }

  for (const c of category) {
    if (!topicCategory.includes(c)) {
      return 10218
    }
  }

  if (!section.length || section.length > 2) {
    return 10219
  }

  for (const s of section) {
    if (!topicSection.includes(s)) {
      return 10222
    }
  }

  if (!isValidTimestamp(edited)) {
    return 10208
  }

  return 0
}
