import Router from 'koa-router'
import UserController from '@/controller/userController'

const router = new Router()

router.prefix('/api/user')

// 注册
router.post('/register', UserController.register)

// 登录
router.post('/login', UserController.login)

// 获取单个用户信息
router.get('/:uid', UserController.getUserByUid)

// 更新用户头像
router.post('/:uid/avatar', UserController.updateUserAvatar)

// 更新用户签名
router.put('/:uid/bio', UserController.updateUserBio)

// 获取用户邮箱
router.get('/:uid/email', UserController.getUserEmail)

// 更新用户邮箱
router.put('/:uid/email', UserController.updateUserEmail)

// 更新用户密码
router.put('/:uid/password', UserController.updateUserPassword)

// 获取用户的话题
router.get('/:uid/topics', UserController.getUserTopics)

// 获取用户发布的回复
router.get('/:uid/replies', UserController.getUserReplies)

// 获取用户发布的评论
router.get('/:uid/comments', UserController.getUserComments)

export default router
