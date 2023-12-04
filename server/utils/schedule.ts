import schedule from 'node-schedule'

import UserModel from '@/models/userModel'

// 创建每日 0 点的定时任务
const resetDailyTopicCountJTask = schedule.scheduleJob(
  '0 0 * * *',
  async () => {
    try {
      // 在这里执行重置操作，将用户模型的 daily_topic_count 设置为 0
      await UserModel.updateMany({}, { $set: { daily_topic_count: 0 } })
      console.log('Reset user daily_topic_count successfully!')
    } catch (error) {
      console.error('Reset user daily_topic_count ERROR: ', error)
    }
  }
)

export const useKUNGalgameTask = () => {
  resetDailyTopicCountJTask
}
