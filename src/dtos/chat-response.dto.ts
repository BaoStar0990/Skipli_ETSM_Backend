import { Expose } from 'class-transformer'
import UserCreateDto from './user-create.dto'

export default class ChatResponseDto {
  @Expose()
  id!: string
  @Expose()
  lastMessage!: string
  @Expose()
  updatedAt!: Date
  peerUser!: UserCreateDto
}
