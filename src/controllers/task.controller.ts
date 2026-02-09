import { Request, Response } from 'express'
import { ApiResponse } from '~/dtos/api-response.dto'
import TaskDto from '~/dtos/task.dto'
import taskServiceImpl from '~/services/impls/task-service.impl'

class TaskController {
  async updateTaskProgress(req: Request, res: Response) {
    const { id } = req.params
    const { progress } = req.body
    await taskServiceImpl.updateTaskProgress(id as string, progress as number)
    res.status(200).send(ApiResponse.builder().setMessage('Task progress updated successfully').setCode(200).build())
  }
  async deleteTask(req: Request, res: Response) {
    const { id } = req.params
    await taskServiceImpl.deleteTask(id as string)
    res.status(200).send(ApiResponse.builder().setMessage('Task deleted successfully').setCode(200).build())
  }
  async getTasks(req: Request, res: Response) {
    const tasks = await taskServiceImpl.getTasks()
    res
      .status(200)
      .json(ApiResponse.builder().setCode(200).setMessage('Tasks fetched successfully').setData(tasks).build())
  }
  async createTask(req: Request, res: Response) {
    const body: TaskDto = req.body
    await taskServiceImpl.createTask(body)
    res.status(201).send(ApiResponse.builder().setMessage('Task created successfully').setCode(201).build())
  }
}

export default new TaskController()
