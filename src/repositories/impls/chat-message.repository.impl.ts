import { db } from '~/config/db.config'
import IChatMessageRepository from '../interfaces/chat-message.repository.interface'
import ChatMessage from '~/entities/message.entity'
import ObjectModerator from '~/utils/object-moderator.util'
import { plainToInstance } from 'class-transformer'

class ChatMessageRepository implements IChatMessageRepository {
  async findLastMessageInChat(chatId: string): Promise<ChatMessage | null> {
    const snapshot = await db
      .collection('chat_messages')
      .where('chatId', '==', chatId)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get()

    if (snapshot.empty) {
      return null
    }
    const doc = snapshot.docs[0]
    return plainToInstance(ChatMessage, doc.data())
  }
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
  async update(id: string, entity: ChatMessage): Promise<void> {
    const query = await db.collection('chat_messages').where('id', '==', id).get()
    if (query.empty) {
      throw new Error('Chat message not found')
    }
    const docRef = query.docs[0].ref
    await docRef.update(ObjectModerator.removeUndefined(entity.toJSON()))
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  findAll(options: { page: number; size: number }): Promise<ChatMessage[]> {
    throw new Error('Method not implemented.')
  }
}

export default new ChatMessageRepository()
