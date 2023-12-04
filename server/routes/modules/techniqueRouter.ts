import Router from 'koa-router'
import TopicController from '@/controller/topicController'

const router = new Router()

router.prefix('/api/technique')

router.get('/topic', TopicController.getTechniqueTopics)

export default router
