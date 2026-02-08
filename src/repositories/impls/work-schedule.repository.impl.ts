import WorkSchedule from '~/entities/work-schedule.entity'
import IWorkScheduleRepository from '../interfaces/work-schedule.repository.interface'
import { db } from '~/config/db.config'
import ObjectModerator from '~/utils/object-moderator.util'
import { plainToInstance } from 'class-transformer'

class WorkScheduleRepository implements IWorkScheduleRepository {
  async create(entity: WorkSchedule): Promise<void> {
    await db.collection('work_schedules').add(ObjectModerator.removeUndefined(entity.toJson()))
  }
  async findById(id: string): Promise<WorkSchedule | null> {
    throw new Error('Method not implemented.')
  }
  async update(id: string, entity: WorkSchedule): Promise<void> {
    throw new Error('Method not implemented.')
  }
  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  async findAll(options: { page: number; size: number }): Promise<WorkSchedule[]> {
    const snapshot = await db.collection('work_schedules').get()
    const days: WorkSchedule[] = []
    snapshot.forEach((doc) => {
      days.push(plainToInstance(WorkSchedule, doc.data()))
    })
    return days
  }
}

export default new WorkScheduleRepository()
