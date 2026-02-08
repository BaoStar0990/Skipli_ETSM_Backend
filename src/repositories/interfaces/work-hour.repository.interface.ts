import WorkHour from '~/entities/work-hour.entity'
import IRepository from './repository.interface'

export default interface IWorkHourRepository extends IRepository<WorkHour> {}
