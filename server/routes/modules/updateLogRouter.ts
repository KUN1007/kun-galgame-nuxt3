import Router from 'koa-router'
import UpdateLogController from '@/controller/updateLogController'

const router = new Router()

router.prefix('/api/update')

router.post('/history', UpdateLogController.createUpdateLog)

router.get('/history', UpdateLogController.getUpdateLogs)

router.put('/history', UpdateLogController.updateUpdateLog)

router.delete('/history', UpdateLogController.deleteUpdateLog)

export default router
