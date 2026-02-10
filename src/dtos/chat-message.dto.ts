import { Expose } from 'class-transformer'

export default class ChatMessageDto {
  @Expose()
  id!: string
  @Expose()
  senderId!: string
  @Expose()
  receiverId!: string
  @Expose()
  content!: string
}
