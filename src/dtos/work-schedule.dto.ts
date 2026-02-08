import { Expose } from 'class-transformer'
import UserCreateDto from './user-create.dto'
import WorkDayDto from './work-day.dto'

export default class WorkScheduleDto {
  @Expose()
  id!: string
  @Expose()
  effectiveFrom!: string
  @Expose()
  effectiveTo!: string
  @Expose()
  workDays!: WorkDayDto[]
  employee?: UserCreateDto
}
