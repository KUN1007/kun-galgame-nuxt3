import Router from 'koa-router'
import TopicController from '@/controller/topicController'
import UserController from '@/controller/userController'

const router = new Router()

router.prefix('/api/ranking')

// 获取热门话题，用于 ranking
router.get('/topics', TopicController.getTopicRanking)

// 获取热门用户，用于 ranking
router.get('/users', UserController.getUserRanking)

export default router
