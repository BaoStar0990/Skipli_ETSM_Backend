import Task from '~/entities/task.entity'
import ITaskRepository from '../interfaces/task.repository.interface'
import { db } from '~/config/db.config'
import ObjectModerator from '~/utils/object-moderator.util'
import { plainToInstance } from 'class-transformer'

class TaskRepository implements ITaskRepository {
  async create(entity: Task): Promise<void> {
    await db.collection('tasks').add(ObjectModerator.removeUndefined(entity.toJson()))
  }
  findById(id: string): Promise<Task | null> {
    throw new Error('Method not implemented.')
  }
  update(id: string, entity: Task): Promise<void> {
    throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  async findAll(options: { page: number; size: number }): Promise<Task[]> {
    const snapshot = await db.collection('tasks').get()
    const tasks: Task[] = []
    snapshot.forEach((doc) => {
      tasks.push(plainToInstance(Task, doc.data()))
    })
    return tasks
  }
}

export default new TaskRepository()
