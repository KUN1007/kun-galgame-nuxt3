import { Context } from 'koa'
import NonMoeService from '@/service/nonMoeService'

type SortOrder = 'asc' | 'desc'

// 这里设定只能由管理员创建，前端数据受信任，无需重新检测
class NonMoeController {
  // 创建不萌记录
  async createNonMoeLog(ctx: Context) {
    const { uid, name, description, time, result } = ctx.request.body

    await NonMoeService.createNonMoeLog(uid, name, description, time, result)

    ctx.body = {
      code: 200,
      message: 'OK',
      data: {},
    }
  }

  // 获取不萌记录
  async getNonMoeLogs(ctx: Context) {
    const { page, limit, sortOrder } = ctx.query

    const data = await NonMoeService.getNonMoeLogs(
      parseInt(page as string),
      parseInt(limit as string),
      sortOrder as SortOrder
    )

    ctx.body = {
      code: 200,
      message: 'OK',
      data: data,
    }
  }
}

export default new NonMoeController()
