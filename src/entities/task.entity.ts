import { TaskStatus } from '~/constants/task-status.enum'
import BaseEntity from './base.entity'

export default class Task extends BaseEntity {
  name!: string
  description!: string
  status: TaskStatus = TaskStatus.PENDING
  progress: number = 0
  employeeId!: string

  toJson() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      status: this.status,
      progress: this.progress,
      employeeId: this.employeeId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
