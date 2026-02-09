import { db } from '~/config/db.config'
import IChatMessageRepository from '../interfaces/chat-message.repository.interface'
import ChatMessage from '~/entities/message.entity'
import ObjectModerator from '~/utils/object-moderator.util'

class ChatMessageRepository implements IChatMessageRepository {
  async create(entity: ChatMessage): Promise<void> {
    await db.collection('chat_messages').add(ObjectModerator.removeUndefined(entity.toJSON()))
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
