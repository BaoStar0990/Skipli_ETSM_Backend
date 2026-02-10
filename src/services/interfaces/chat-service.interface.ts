import { Request } from 'express'
import ChatCreateDto from '~/dtos/chat-create.dto'
import ChatMessageDto from '~/dtos/chat-message.dto'
import ChatResponseDto from '~/dtos/chat-response.dto'

export default interface IChatService {
  sendMessage(req: Request, message: ChatMessageDto): Promise<void>
  getUserChats(userId: string): Promise<ChatResponseDto[]>
  createChat(userId: string, body: ChatCreateDto): Promise<ChatResponseDto>
  getChatById(chatId: string): Promise<ChatResponseDto>
}
