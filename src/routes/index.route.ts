import { Router } from 'express'
import authRouter from './auth.route'
import userRoute from './user.route'
import taskRouter from './task.route'
import authMiddleware from '~/middlewares/auth.middleware'
import scheduleRouter from './schedule.route'

const appRouter = Router()

appRouter.use('/auth', authRouter)
appRouter.use('/employees', userRoute)
appRouter.use('/tasks', authMiddleware, taskRouter)
appRouter.use('/schedules', authMiddleware, scheduleRouter)

export default appRouter
