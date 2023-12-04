/*
 * 更新日志的 CRUD，定义了一些对更新日志数据的数据库交互操作
 */

import UpdateLogModel from '@/models/updateLogModel'
import { UpdateLogAttributes } from '@/models/types/updateLogModel'

class UpdateLogService {
  // 创建单条更新数据
  async createUpdateLog(updateLogData: UpdateLogAttributes) {
    const newUpdateLog = new UpdateLogModel(updateLogData)
    const savedUpdateLog = await newUpdateLog.save()
    return savedUpdateLog
  }

  // 每次返回 5 条历史更新记录，按照时间排序
  async getUpdateLogs(page: number, limit: number) {
    // 根据请求参数计算跳过的步幅
    const skip = (page - 1) * limit

    // 根据时间排列好五条数据
    const updateLogs = await UpdateLogModel.find()
      .sort({ upid: -1 })
      .skip(skip)
      .limit(limit)

    // 将数据结构适配为接口定义好的数据结构
    const data = updateLogs.map((log) => ({
      upid: log.upid,
      description: log.description,
      time: log.time,
      version: log.version,
    }))

    // Calculate the total number of pages
    // const totalLogs = await updateLog.countDocuments()
    // const totalPages = Math.ceil(totalLogs / limit)

    return data
  }

  // 更新单条更新数据
  async updateUpdateLog(upid: number, description: string, version: string) {
    const updatedUpdateLog = await UpdateLogModel.findByIdAndUpdate(
      upid,
      { description, version },
      { new: true }
    )
    return updatedUpdateLog
  }

  // 删除单条更新数据
  async deleteUpdateLog(id: number) {
    const deletedUpdateLog = await UpdateLogModel.findByIdAndDelete(id)
    return deletedUpdateLog
  }
}

export default new UpdateLogService()
