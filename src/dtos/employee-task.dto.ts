import { Expose } from 'class-transformer'

export default class EmployeeTaskDto {
  @Expose()
  id!: string
  @Expose()
  name!: string
  @Expose()
  description!: string
  @Expose()
  progress!: number
  @Expose()
  status!: string
}
