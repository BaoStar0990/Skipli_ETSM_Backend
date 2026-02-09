import WorkHour from '~/entities/work-hour.entity'
import IWorkHourRepository from '../interfaces/work-hour.repository.interface'
import { db } from '~/config/db.config'
import ObjectModerator from '~/utils/object-moderator.util'
import { plainToInstance } from 'class-transformer'

class WorkHourRepository implements IWorkHourRepository {
  async create(entity: WorkHour): Promise<void> {
    await db.collection('work_hours').add(ObjectModerator.removeUndefined(entity.toJson()))
  }
  async findById(id: string): Promise<WorkHour | null> {
    throw new Error('Method not implemented.')
  }
  async update(id: string, entity: WorkHour): Promise<void> {
    throw new Error('Method not implemented.')
  }
  async delete(id: string): Promise<void> {
    const query = await db.collection('work_hours').where('id', '==', id).get()
    if (query.empty) {
      throw new Error('Work hour not found')
    }
    const doc = query.docs[0].ref
    await doc.delete()
  }
  async findAll(options: { page: number; size: number }): Promise<WorkHour[]> {
    throw new Error('Method not implemented.')
  }
  async findByWorkDayId(workDayId: string): Promise<WorkHour[]> {
    const snapshot = await db.collection('work_hours').where('workDayId', '==', workDayId).get()
    const hours: WorkHour[] = []
    snapshot.forEach((doc) => {
      hours.push(plainToInstance(WorkHour, doc.data()))
    })
    return hours
  }
}
export default new WorkHourRepository()
