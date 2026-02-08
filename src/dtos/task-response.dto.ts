import { TaskStatus } from '~/constants/task-status.enum'
import UserCreateDto from './user-create.dto'
import { Expose } from 'class-transformer'

export default class TaskResponseDto {
  @Expose()
  id!: string
  @Expose()
  name!: string
  @Expose()
  description!: string
  @Expose()
  status!: TaskStatus
  @Expose()
  progress!: number
  @Expose()
  employee: UserCreateDto | null = null
}
