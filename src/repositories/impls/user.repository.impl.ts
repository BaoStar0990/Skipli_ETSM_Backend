import User from '~/entities/user.entity'
import IUserRepository from '../interfaces/user.repository.interface'
import { db } from '~/config/db.config'
import ObjectModerator from '~/utils/object-moderator.util'
import { plainToInstance } from 'class-transformer'
import UserRole from '~/constants/user-role.enum'

class UserRepository implements IUserRepository {
  async findByUsername(username: string): Promise<User | null> {
    const querySnapshot = await db.collection('users').where('username', '==', username).limit(1).get()
    if (querySnapshot.empty) {
      return null
    }
    const doc = querySnapshot.docs[0]
    return plainToInstance(User, doc.data())
  }
  async findAll(options: { page: number; size: number }): Promise<User[]> {
    const { page, size } = options
    const snapshot = await db
      .collection('users')
      .orderBy('createdAt', 'desc')
      .where('role', '==', UserRole.EMPLOYEE)
      .offset((page - 1) * size)
      .limit(size)
      .get()
    const users: User[] = []
    snapshot.forEach((doc) => {
      users.push(plainToInstance(User, doc.data()))
    })
    return users
  }

  async findByEmail(email: string): Promise<User | null> {
    const querySnapshot = await db.collection('users').where('email', '==', email).limit(1).get()
    if (querySnapshot.empty) {
      return null
    }
    const doc = querySnapshot.docs[0]
    return plainToInstance(User, doc.data())
  }

  async create(entity: User): Promise<void> {
    const json = entity.toJSON()
    const cleanJSON = ObjectModerator.removeUndefined(json)
    await db.collection('users').add(cleanJSON)
  }

  async findById(id: string): Promise<User | null> {
    const query = await db.collection('users').where('id', '==', id).limit(1).get()
    if (query.empty) {
      return null
    }
    const doc = query.docs[0]
    return plainToInstance(User, doc.data())
  }

  async update(id: string, entity: User): Promise<void> {
    const query = await db.collection('users').where('id', '==', id).get()
    if (query.empty) {
      throw new Error('User not found')
    }
    const doc = query.docs[0].ref
    await doc.update(ObjectModerator.removeUndefined(entity.toJSON()))
  }

  async delete(id: string): Promise<void> {
    await db
      .collection('users')
      .where('id', '==', id)
      .get()
      .then((query) => {
        if (query.empty) {
          throw new Error('User not found')
        }
        const doc = query.docs[0].ref
        return doc.delete()
      })
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    const querySnapshot = await db
      .collection('users')
      .where('phoneNumber', '==', phoneNumber)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get()
    if (querySnapshot.empty) {
      return null
    }
    const doc = querySnapshot.docs[0]
    return plainToInstance(User, doc.data())
  }
}

export default new UserRepository()
