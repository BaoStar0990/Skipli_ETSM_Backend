import BaseEntity from './base.entity'

export default class Chat extends BaseEntity {
  lastMessage!: string
  firstUserId!: string
  secondUserId!: string

  toJSON() {
    return {
      id: this.id,
      lastMessage: this.lastMessage,
      firstUserId: this.firstUserId,
      secondUserId: this.secondUserId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
