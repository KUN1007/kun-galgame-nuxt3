import TopicModel from '~/server/models/topic'

const getCategoryData = async (category: string) => {
  const data = await TopicModel.aggregate([
    {
      $match: { category }
    },
    {
      $group: {
        _id: '$section',
        topics: { $sum: 1 },
        views: { $sum: '$views' },
        latestTopic: { $first: '$$ROOT' }
      }
    },
    {
      $project: {
        _id: 0,
        section: '$_id',
        topic: {
          title: '$latestTopic.title',
          time: '$latestTopic.time'
        },
        user: {
          uid: '$latestTopic.uid'
        },
        topics: 1,
        views: 1
      }
    }
  ])
  return data
}

export default defineEventHandler(async (event) => {
  const { category }: { category: string } = await getQuery(event)
  const availableCategory = ['galgame', 'technique', 'others']
  if (!availableCategory.includes(category)) {
    kunError(event, 10220)
    return
  }

  const capitalizeFirstLetter =
    category.charAt(0).toUpperCase() + category.slice(1)
  const result = await getCategoryData(capitalizeFirstLetter)

  console.log(result)
})
