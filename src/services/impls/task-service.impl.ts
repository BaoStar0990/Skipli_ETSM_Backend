import TaskDto from '~/dtos/task.dto'
import ITaskService from '../interfaces/task-service.interface'
import { plainToInstance } from 'class-transformer'
import Task from '~/entities/task.entity'
import taskRepositoryImpl from '~/repositories/impls/task.repository.impl'
import UuidGenerator from '~/utils/uuid-generator.util'
import TaskResponseDto from '~/dtos/task-response.dto'
import userRepositoryImpl from '~/repositories/impls/user.repository.impl'
import UserCreateDto from '~/dtos/user-create.dto'

class TaskService implements ITaskService {
  async getTasks() {
    const query = await taskRepositoryImpl.findAll({ page: 1, size: 20 })
    const result = await Promise.all(
      query.map(async (task) => {
        const dto = plainToInstance(TaskResponseDto, task, { excludeExtraneousValues: true })
        dto.employee = plainToInstance(UserCreateDto, await userRepositoryImpl.findById(task.employeeId), {
          excludeExtraneousValues: true
        })
        return dto
      })
    )
    return result
  }
  async createTask(body: TaskDto): Promise<void> {
    const task = plainToInstance(Task, body)
    task.setId(UuidGenerator.generate())
    task.setCreatedAt(Date.now())
    task.setUpdatedAt(Date.now())
    await taskRepositoryImpl.create(task)
  }
}

export default new TaskService()
