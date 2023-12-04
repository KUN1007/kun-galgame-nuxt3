import Router from 'koa-router'
import PLController from '@/controller/plController'

const router = new Router()

router.prefix('/api/balance')

// 创建 income
router.post('/income', PLController.createIncome)

// 创建 expenditure
router.post('/expenditure', PLController.createExpenditure)

// 获取 income
router.get('/income', PLController.getIncomes)

// 获取 expenditure
router.get('/expenditure', PLController.getExpenditures)

// 获取收支总数
router.get('/statement', PLController.getPLStatement)

export default router
