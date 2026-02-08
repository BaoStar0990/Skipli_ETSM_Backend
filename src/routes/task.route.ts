import { Router } from 'express'
import taskController from '~/controllers/task.controller'

const taskRouter = Router()

taskRouter.post('/', taskController.createTask)
taskRouter.get('/', taskController.getTasks)

export default taskRouter
