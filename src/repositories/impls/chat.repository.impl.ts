import Chat from '~/entities/chat.entity'
import IChatRepository from '../interfaces/chat.repository.interface'
import { db } from '~/config/db.config'
import { plainToInstance } from 'class-transformer'
import ObjectModerator from '~/utils/object-moderator.util'
import { Filter } from 'firebase-admin/firestore'

class ChatRepository implements IChatRepository {
  async findByUserId(userId: string): Promise<Chat[]> {
    const query = await db
      .collection('chats')
      .where(Filter.or(Filter.where('firstUserId', '==', userId), Filter.where('secondUserId', '==', userId)))
      .get()
    const chats: Chat[] = []
    query.forEach((doc) => {
      const chatData = plainToInstance(Chat, doc.data())
      chats.push(chatData)
    })
    return chats
  }
  async create(entity: Chat): Promise<Chat> {
    const docRef = await db.collection('chats').add(ObjectModerator.removeUndefined(entity.toJSON()))
    const snapshot = await docRef.get()
    return plainToInstance(Chat, snapshot.data())
  }
  async findById(id: string): Promise<Chat | null> {
    const query = await db.collection('chats').where('id', '==', id).get()
    if (query.empty) {
      return null
    }
    const chatData = plainToInstance(Chat, query.docs[0].data())
    return chatData
  }
  async update(id: string, entity: Chat): Promise<void> {
    const query = await db.collection('chats').where('id', '==', id).get()
    if (query.empty) {
      throw new Error('Chat not found')
    }
    const docId = query.docs[0].id
    await db.collection('chats').doc(docId).update(ObjectModerator.removeUndefined(entity.toJSON()))
  }
  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  async findAll(options: { page: number; size: number }): Promise<Chat[]> {
    throw new Error('Method not implemented.')
  }
}

export default new ChatRepository()
