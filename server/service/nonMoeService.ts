import NonMoeModel from '@/models/nonMoeModel'

type SortOrder = 'asc' | 'desc'

class NonMoeService {
  // 添加一条不萌记录
  async createNonMoeLog(
    uid: number,
    name: string,
    description: string,
    time: number,
    result: string
  ) {
    const newIncome = new NonMoeModel({
      uid,
      name,
      description,
      time,
      result,
    })

    await newIncome.save()
  }
  // 获取不萌记录，30 条
  /**
   * @param {number} page - 分页的页数，第几页
   * @param {number} limit - 分页中每页有多少条信息
   * @param {SortOrder} sortOrder - 升序还是降序，`asc`, `desc`
   */
  async getNonMoeLogs(page: number, limit: number, sortOrder: SortOrder) {
    const skip = (page - 1) * limit

    const nonMoeLogs = await NonMoeModel.find()
      .sort(sortOrder)
      .skip(skip)
      .limit(limit)
      .lean()

    const responseData = nonMoeLogs.map((log) => ({
      nid: log.nid,
      uid: log.uid,
      name: log.name,
      description: log.description,
      time: log.time,
      result: log.result,
    }))

    return responseData
  }
}

export default new NonMoeService()
