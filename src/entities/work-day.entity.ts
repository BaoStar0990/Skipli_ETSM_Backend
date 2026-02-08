import { Exclude, Expose } from 'class-transformer'
import BaseEntity from './base.entity'

export default class WorkDay extends BaseEntity {
  @Expose()
  date!: string
  isWorkingDay: boolean = true
  workScheduleId!: string

  toJson(): any {
    return {
      id: this.id,
      date: this.date,
      isWorkingDay: this.isWorkingDay,
      workScheduleId: this.workScheduleId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
