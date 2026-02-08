import { Expose } from 'class-transformer'

export default class WorkHourDto {
  @Expose()
  id!: string
  @Expose()
  startTime!: string
  @Expose()
  endTime!: string
}
