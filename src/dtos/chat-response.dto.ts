import { Expose } from 'class-transformer'
import UserCreateDto from './user-create.dto'
import ChatMessageDto from './chat-message.dto'

export default class ChatResponseDto {
  @Expose()
  id!: string
  @Expose()
  lastMessage!: string
  @Expose()
  updatedAt!: Date
  isSeen: boolean | null = null
  peerUser!: UserCreateDto
  chatHistory: ChatMessageDto[] = []
}
