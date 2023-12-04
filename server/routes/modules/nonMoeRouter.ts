import Router from 'koa-router'
import NonMoeController from '@/controller/nonMoeController'

const router = new Router()

router.prefix('/api/non-moe')

// 创建不萌记录
router.post('/logs', NonMoeController.createNonMoeLog)

// 获取不萌记录
router.get('/logs', NonMoeController.getNonMoeLogs)

export default router
