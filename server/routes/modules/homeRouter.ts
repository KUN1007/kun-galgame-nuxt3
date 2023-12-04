import Router from 'koa-router'
import TopicController from '@/controller/topicController'

const router = new Router()

router.prefix('/api/home')

// 搜索话题
router.get('/search', TopicController.searchTopics)

// 获取首页话题
router.get('/topic', TopicController.getHomeTopics)

// 获取首页左侧热门话题
router.get('/nav/hot', TopicController.getNavTopTopics)

// 获取首页左侧新发布话题
router.get('/nav/new', TopicController.getNavNewTopics)

export default router
