import { Expose } from 'class-transformer'
import BaseEntity from './base.entity'

export default class ChatMessage extends BaseEntity {
  @Expose()
  content!: string
  @Expose()
  senderId!: string
  @Expose()
  receiverId!: string
  @Expose()
  chatId!: string
  isSeen: boolean = false

  toJSON() {
    return {
      id: this.id,
      content: this.content,
      senderId: this.senderId,
      receiverId: this.receiverId,
      chatId: this.chatId,
      isSeen: this.isSeen,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
