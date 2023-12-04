import Router from 'koa-router'
import TopicController from '@/controller/topicController'

const router = new Router()

router.prefix('/api/pool')

// 获取热门话题，用于 ranking
router.get('/topic', TopicController.getPoolTopics)

export default router
