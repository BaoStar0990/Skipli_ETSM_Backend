import Otp from '~/entities/otp.entity'
import IOtpRepository from '../interfaces/otp.repository.interface'
import { db } from '~/config/db.config'
import ObjectModerator from '~/utils/object-moderator.util'
import { plainToInstance } from 'class-transformer'

class OtpRepository implements IOtpRepository {
  findAll(options: { page: number; size: number }): Promise<Otp[]> {
    throw new Error('Method not implemented.')
  }
  async findByEmail(email: string): Promise<Otp | null> {
    const querySnapshot = await db
      .collection('otps')
      .where('entityValue', '==', email)
      .where('entityType', '==', 'EMAIL')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get()
    if (querySnapshot.empty) {
      return null
    }
    const doc = querySnapshot.docs[0]
    return plainToInstance(Otp, doc.data())
  }
  async findByPhoneNumber(phoneNumber: string): Promise<Otp | null> {
    const querySnapshot = await db
      .collection('otps')
      .where('entityValue', '==', phoneNumber)
      .where('entityType', '==', 'SMS')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get()
    if (querySnapshot.empty) {
      return null
    }
    const doc = querySnapshot.docs[0]
    return plainToInstance(Otp, doc.data())
  }
  async create(entity: Otp): Promise<void> {
    await db.collection('otps').add(ObjectModerator.removeUndefined(entity.toJSON()))
  }
  findById(id: string): Promise<Otp | null> {
    throw new Error('Method not implemented.')
  }
  async update(id: string, entity: Otp): Promise<void> {
    const querySnapshot = await db.collection('otps').where('id', '==', id).get()
    if (querySnapshot.empty) {
      throw new Error('OTP not found')
    }
    const docId = querySnapshot.docs[0].id
    await db.collection('otps').doc(docId).update(ObjectModerator.removeUndefined(entity.toJSON()))
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

export default new OtpRepository()
