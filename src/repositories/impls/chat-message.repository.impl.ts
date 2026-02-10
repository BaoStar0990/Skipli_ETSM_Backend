import { db } from '~/config/db.config'
import IChatMessageRepository from '../interfaces/chat-message.repository.interface'
import ChatMessage from '~/entities/message.entity'
import ObjectModerator from '~/utils/object-moderator.util'
import { plainToInstance } from 'class-transformer'

class ChatMessageRepository implements IChatMessageRepository {
  async findByChatId(chatId: string, options: { page: number; size: number }): Promise<ChatMessage[]> {
    const snapshot = await db
      .collection('chat_messages')
      .where('chatId', '==', chatId)
      .orderBy('createdAt', 'asc')
      .offset((options.page - 1) * options.size)
      .limit(options.size)
      .get()
    const messages: ChatMessage[] = []
    snapshot.forEach((doc) => {
      const message = new ChatMessage()
      Object.assign(message, doc.data())
      messages.push(message)
    })
    return messages
  }
  async create(entity: ChatMessage): Promise<ChatMessage> {
    const docRef = await db.collection('chat_messages').add(ObjectModerator.removeUndefined(entity.toJSON()))
    const doc = await docRef.get()
    return plainToInstance(ChatMessage, doc.data())
  }
  findById(id: string): Promise<ChatMessage | null> {
    throw new Error('Method not implemented.')
  }
  update(id: string, entity: ChatMessage): Promise<void> {
    throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  findAll(options: { page: number; size: number }): Promise<ChatMessage[]> {
    throw new Error('Method not implemented.')
  }
}

export default new ChatMessageRepository()
