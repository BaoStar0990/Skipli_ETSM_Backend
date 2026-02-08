import { Router } from 'express'
import authRouter from './auth.route'
import userRoute from './user.route'
import taskRouter from './task.route'
import authMiddleware from '~/middlewares/auth.middleware'

const appRouter = Router()

appRouter.use('/auth', authRouter)
appRouter.use('/employees', userRoute)
appRouter.use('/tasks', authMiddleware, taskRouter)

export default appRouter
