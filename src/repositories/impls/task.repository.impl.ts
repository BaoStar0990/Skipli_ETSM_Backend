import Task from '~/entities/task.entity'
import ITaskRepository from '../interfaces/task.repository.interface'
import { db } from '~/config/db.config'
import ObjectModerator from '~/utils/object-moderator.util'
import { plainToInstance } from 'class-transformer'

class TaskRepository implements ITaskRepository {
  async findAllByEmployeeId(employeeId: string): Promise<Task[]> {
    const snapshot = await db.collection('tasks').where('employeeId', '==', employeeId).get()
    const tasks: Task[] = []
    snapshot.forEach((doc) => {
      tasks.push(plainToInstance(Task, doc.data()))
    })
    return tasks
  }
  async create(entity: Task): Promise<void> {
    await db.collection('tasks').add(ObjectModerator.removeUndefined(entity.toJson()))
  }
  async findById(id: string): Promise<Task | null> {
    const query = await db.collection('tasks').where('id', '==', id).get()
    if (query.empty) {
      return null
    }
    const doc = query.docs[0]
    return plainToInstance(Task, doc.data())
  }
  async update(id: string, entity: Task): Promise<void> {
    const query = await db.collection('tasks').where('id', '==', id).get()
    if (query.empty) {
      throw new Error('Task not found')
    }
    const doc = query.docs[0]
    await doc.ref.update(ObjectModerator.removeUndefined(entity.toJson()))
  }
  async delete(id: string): Promise<void> {
    await db
      .collection('tasks')
      .where('id', '==', id)
      .get()
      .then(async (query) => {
        if (query.empty) {
          throw new Error('Task not found')
        }
        const doc = query.docs[0]
        await doc.ref.delete()
      })
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
