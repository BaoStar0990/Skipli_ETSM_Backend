import { Expose } from 'class-transformer'
import WorkHourDto from './work-hour.dto'

export default class WorkDayDto {
  @Expose()
  id!: string
  @Expose()
  date!: string
  @Expose()
  workHours!: WorkHourDto[]
}
