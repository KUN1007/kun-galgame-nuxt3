import prisma from '~/prisma/prisma'
import type { CategoryResponseData } from '~/types/api/category'

export const categoryMap: Record<string, string> = {
  Galgame: 'g-',
  Technique: 't-',
  Others: 'o-'
}

const getCategoryData = async (category: string) => {
  const categoryDataCache = await useStorage('redis').getItem(
    `category:${category}`
  )
  if (categoryDataCache) {
    return categoryDataCache as CategoryResponseData[]
  }

  const prefix = categoryMap[category]
  if (!prefix) {
    return []
  }
  const pattern = `${prefix}%`

  //   const data: CategoryResponseData[] = await TopicModel.aggregate([
  //   {
  //     $unwind: '$section'
  //   },
  //   {
  //     $match: {
  //       section: categoryMap[category]
  //     }
  //   },
  //   {
  //     $group: {
  //       _id: '$section',
  //       topics: { $sum: 1 },
  //       views: { $sum: '$views' },
  //       latestTopic: { $last: '$$ROOT' }
  //     }
  //   },
  //   {
  //     $project: {
  //       _id: 0,
  //       section: '$_id',
  //       topic: {
  //         tid: '$latestTopic.tid',
  //         title: '$latestTopic.title',
  //         time: '$latestTopic.time'
  //       },
  //       topics: 1,
  //       views: 1
  //     }
  //   }
  // ])

  // prettier-ignore
  const data: CategoryResponseData[] = await prisma.$queryRaw<CategoryResponseData[]>`
    WITH RankedTopics AS (
      SELECT
        t.id,
        t.title,
        t.created,
        t.view,
        tt.section,
        ROW_NUMBER() OVER(PARTITION BY tt.section ORDER BY t.created DESC) as rn
      FROM "topic_tag" AS tt
      JOIN "topic" AS t ON tt.topic_id = t.id
      WHERE tt.section LIKE ${pattern}
    ),
    Aggregates AS (
      SELECT
        section,
        COUNT(*) as topics,
        SUM(view) as views
      FROM RankedTopics
      GROUP BY section
    )
    SELECT
      agg.section,
      agg.topics,
      agg.views,
      json_build_object(
        'tid', rt.id,
        'title', rt.title,
        'time', rt.created
      ) AS topic
    FROM Aggregates AS agg
    JOIN RankedTopics AS rt ON agg.section = rt.section
    WHERE rt.rn = 1
    ORDER BY agg.section;
  `

  await useStorage('redis').setItem(`category:${category}`, data, {
    ttl: 17 * 60
  })

  return data
}

export default defineEventHandler(async (event) => {
  const { category }: { category: string } = await getQuery(event)
  const availableCategory = ['galgame', 'technique', 'others']
  if (!availableCategory.includes(category)) {
    return kunError(event, '非法的话题分类')
  }

  const capitalizeFirstLetter =
    category.charAt(0).toUpperCase() + category.slice(1)
  const result = await getCategoryData(capitalizeFirstLetter)

  return result
})
