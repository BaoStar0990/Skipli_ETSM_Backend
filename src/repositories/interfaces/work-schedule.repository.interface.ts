import WorkSchedule from '~/entities/work-schedule.entity'
import IRepository from './repository.interface'

export default interface IWorkScheduleRepository extends IRepository<WorkSchedule> {}
