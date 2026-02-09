import { Router } from 'express'
import scheduleController from '~/controllers/schedule.controller'

const scheduleRouter = Router()

scheduleRouter.delete('/:scheduleId', scheduleController.deleteWorkSchedule)

export default scheduleRouter
