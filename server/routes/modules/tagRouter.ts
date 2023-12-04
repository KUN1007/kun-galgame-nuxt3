import Router from 'koa-router'
import TagController from '@/controller/tagController'

const router = new Router()

router.prefix('/api/tag')

// 获取热门的 10 个 tag
router.get('/popular', TagController.getTopTags)

export default router
