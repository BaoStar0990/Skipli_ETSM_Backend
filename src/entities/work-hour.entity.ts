import { Expose } from 'class-transformer'
import BaseEntity from './base.entity'

export default class WorkHour extends BaseEntity {
  @Expose()
  startTime!: string
  @Expose()
  endTime!: string
  workDayId!: string

  toJson() {
    return {
      id: this.id,
      startTime: this.startTime,
      endTime: this.endTime,
      workDayId: this.workDayId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
