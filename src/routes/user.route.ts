import { Router } from 'express'
import authController from '~/controllers/auth.controller'
import userController from '~/controllers/user.controller'
import authMiddleware from '~/middlewares/auth.middleware'

const userRoute = Router()

userRoute.post('/:id/confirmation', userController.confirmAccount)

userRoute.use(authMiddleware)
userRoute.post('/', userController.createEmployee)
userRoute.get('/', userController.getEmployees)
userRoute.get('/work-schedules', userController.getWorkSchedules)
userRoute.post('/:id/account-setup', authController.setupAccount)
userRoute.get('/:id', userController.getEmployeeById)
userRoute.put('/:id', userController.updateEmployeeById)
userRoute.delete('/:id', userController.deleteEmployeeById)
userRoute.post('/:id/work-schedules', userController.createWorkSchedule)
userRoute.get('/:id/tasks', userController.getEmployeeTasks)

export default userRoute
