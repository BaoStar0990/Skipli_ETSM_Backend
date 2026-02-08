import IRepository from './repository.interface'
import WorkDay from '~/entities/work-day.entity'

export default interface IWorkDayRepository extends IRepository<WorkDay> {}
