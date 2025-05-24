import mongoose from 'mongoose'
import TopicModel from '../../server/models/topic'
import GalgameModel from '../../server/models/galgame'
import { config } from 'dotenv'

config()
mongoose.connect(process.env.MONGODB_URL ?? '')

export const getKunDynamicRoutes = async () => {
  const topics = await TopicModel.find().select('tid updated').lean()

  const galgames = await GalgameModel.find().select('gid updated').lean()

  const topicRoutes = topics.map((topic) => ({
    path: `/topic/${topic.tid}`,
    lastmod: topic.updated?.toISOString() || new Date().toISOString()
  }))

  const galgameRoutes = galgames.map((galgame) => ({
    path: `/galgame/${galgame.gid}`,
    lastmod: galgame.updated?.toISOString() || new Date().toISOString()
  }))

  return [...topicRoutes, ...galgameRoutes]
}
