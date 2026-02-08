import WorkDay from '~/entities/work-day.entity'
import IWorkDayRepository from '../interfaces/work-day.repository.interface'
import { db } from '~/config/db.config'
import ObjectModerator from '~/utils/object-moderator.util'
import { plainToInstance } from 'class-transformer'

class WorkDayRepository implements IWorkDayRepository {
  async create(entity: WorkDay): Promise<void> {
    await db.collection('work_days').add(ObjectModerator.removeUndefined(entity.toJson()))
  }
  findById(id: string): Promise<WorkDay | null> {
    throw new Error('Method not implemented.')
  }
  update(id: string, entity: WorkDay): Promise<void> {
    throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  findAll(options: { page: number; size: number }): Promise<WorkDay[]> {
    throw new Error('Method not implemented.')
  }
  async findByWorkScheduleId(workScheduleId: string): Promise<WorkDay[]> {
    const snapshot = await db.collection('work_days').where('workScheduleId', '==', workScheduleId).get()
    const days: WorkDay[] = []
    snapshot.forEach((doc) => {
      days.push(plainToInstance(WorkDay, doc.data()))
    })
    return days
  }
}

export default new WorkDayRepository()
