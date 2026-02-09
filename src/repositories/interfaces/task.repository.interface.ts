import Task from '~/entities/task.entity'
import IRepository from './repository.interface'

export default interface ITaskRepository extends IRepository<Task> {
  findAllByEmployeeId(employeeId: string): Promise<Task[]>
}
