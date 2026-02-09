import TaskDto from '~/dtos/task.dto'
import ITaskService from '../interfaces/task-service.interface'
import { plainToInstance } from 'class-transformer'
import Task from '~/entities/task.entity'
import taskRepositoryImpl from '~/repositories/impls/task.repository.impl'
import UuidGenerator from '~/utils/uuid-generator.util'
import TaskResponseDto from '~/dtos/task-response.dto'
import userRepositoryImpl from '~/repositories/impls/user.repository.impl'
import UserCreateDto from '~/dtos/user-create.dto'
import { TaskStatus } from '~/constants/task-status.enum'
import EmployeeTaskDto from '~/dtos/employee-task.dto'

class TaskService implements ITaskService {
  async getEmployeeTasks(id: string): Promise<EmployeeTaskDto[]> {
    const user = await userRepositoryImpl.findById(id)
    if (!user) {
      throw new Error('User not found')
    }
    const tasks = await taskRepositoryImpl.findAllByEmployeeId(id)
    return tasks.map((task) => plainToInstance(EmployeeTaskDto, task, { excludeExtraneousValues: true }))
  }
  async updateTaskProgress(id: string, progress: number) {
    const task = await taskRepositoryImpl.findById(id)
    if (!task) {
      throw new Error('Task not found')
    }
    task.progress = progress
    task.setUpdatedAt(Date.now())
    switch (progress) {
      case 0:
        task.status = TaskStatus.PENDING
        break
      case 100:
        task.status = TaskStatus.DONE
        break
      default:
        task.status = TaskStatus.IN_PROGRESS
    }
    await taskRepositoryImpl.update(id, task)
  }
  async deleteTask(id: string | string[]) {
    const task = await taskRepositoryImpl.findById(id as string)
    if (!task) {
      throw new Error('Task not found')
    } else if (task.status !== 'PENDING') {
      throw new Error(`Task is ${task.status}, cannot delete`)
    }
    await taskRepositoryImpl.delete(id as string)
  }
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
