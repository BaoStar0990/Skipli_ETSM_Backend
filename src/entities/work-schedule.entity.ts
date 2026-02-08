import { Expose } from 'class-transformer'
import BaseEntity from './base.entity'

export default class WorkSchedule extends BaseEntity {
  @Expose()
  effectiveFrom!: string
  @Expose()
  effectiveTo!: string
  employeeId!: string

  toJson() {
    return {
      ...this,
      effectiveFrom: this.effectiveFrom,
      effectiveTo: this.effectiveTo,
      employeeId: this.employeeId
    }
  }
}
