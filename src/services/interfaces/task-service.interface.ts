import EmployeeTaskDto from '~/dtos/employee-task.dto'
import TaskResponseDto from '~/dtos/task-response.dto'
import TaskDto from '~/dtos/task.dto'

export default interface ITaskService {
  createTask(body: TaskDto): Promise<void>
  getTasks(): Promise<TaskResponseDto[]>
  deleteTask(id: string | string[]): Promise<void>
  updateTaskProgress(id: string, progress: number): Promise<void>
  getEmployeeTasks(id: string): Promise<EmployeeTaskDto[]>
}
