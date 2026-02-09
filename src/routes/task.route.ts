import { Router } from 'express'
import taskController from '~/controllers/task.controller'

const taskRouter = Router()

taskRouter.post('/', taskController.createTask)
taskRouter.get('/', taskController.getTasks)
taskRouter.delete('/:id', taskController.deleteTask)
taskRouter.patch('/:id', taskController.updateTaskProgress)

export default taskRouter
