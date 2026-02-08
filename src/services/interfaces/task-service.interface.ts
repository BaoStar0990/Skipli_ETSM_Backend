import TaskResponseDto from '~/dtos/task-response.dto'
import TaskDto from '~/dtos/task.dto'

export default interface ITaskService {
  createTask(body: TaskDto): Promise<void>
  getTasks(): Promise<TaskResponseDto[]>
}
