import TopicModel from '~/server/models/topic'
import type { CategoryResponseData } from '~/types/api/category'

export const categoryMap: Record<string, RegExp> = {
  Galgame: /^g-/,
  Technique: /^t-/,
  Others: /^o-/
}

const getCategoryData = async (category: string) => {
  const categoryDataCache = await useStorage('redis').getItem(
    `category:${category}`
  )
  if (categoryDataCache) {
    return categoryDataCache as CategoryResponseData[]
  }

  const data: CategoryResponseData[] = await TopicModel.aggregate([
    {
      $unwind: '$section'
    },
    {
      $match: {
        section: categoryMap[category]
      }
    },
    {
      $group: {
        _id: '$section',
        topics: { $sum: 1 },
        views: { $sum: '$views' },
        latestTopic: { $last: '$$ROOT' }
      }
    },
    {
      $project: {
        _id: 0,
        section: '$_id',
        topic: {
          tid: '$latestTopic.tid',
          title: '$latestTopic.title',
          time: '$latestTopic.time'
        },
        topics: 1,
        views: 1
      }
    }
  ])

  await useStorage('redis').setItem(`category:${category}`, data, {
    ttl: 17 * 60
  })

  return data
}

export default defineEventHandler(async (event) => {
  const { category }: { category: string } = await getQuery(event)
  const availableCategory = ['galgame', 'technique', 'others']
  if (!availableCategory.includes(category)) {
    return kunError(event, 10220)
  }

  const capitalizeFirstLetter =
    category.charAt(0).toUpperCase() + category.slice(1)
  const result = await getCategoryData(capitalizeFirstLetter)

  return result
})
