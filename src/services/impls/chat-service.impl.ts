import ChatMessageDto from '~/dtos/chat-message.dto'
import IChatService from '../interfaces/chat-service.interface'
import { plainToInstance } from 'class-transformer'
import ChatMessage from '~/entities/message.entity'
import chatRepositoryImpl from '~/repositories/impls/chat.repository.impl'
import ObjectModerator from '~/utils/object-moderator.util'
import Chat from '~/entities/chat.entity'
import UuidGenerator from '~/utils/uuid-generator.util'
import messageRepositoryImpl from '~/repositories/impls/chat-message.repository.impl'
import { Request } from 'express'
import ChatResponseDto from '~/dtos/chat-response.dto'
import UserCreateDto from '~/dtos/user-create.dto'
import userRepositoryImpl from '~/repositories/impls/user.repository.impl'
import ChatCreateDto from '~/dtos/chat-create.dto'

class ChatService implements IChatService {
  async getChatById(chatId: string): Promise<ChatResponseDto> {
    const chat = await chatRepositoryImpl.findById(chatId)
    if (!chat) {
      throw new Error('Chat not found')
    }
    const chatDto = plainToInstance(ChatResponseDto, chat, { excludeExtraneousValues: true })
    const peerUserId = chat.firstUserId === chatDto.peerUser?.id ? chat.secondUserId : chat.firstUserId
    const peerUser = await userRepositoryImpl.findById(peerUserId)
    chatDto.peerUser = plainToInstance(UserCreateDto, peerUser, { excludeExtraneousValues: true })

    const messages = await messageRepositoryImpl.findByChatId(chatId, { page: 1, size: 20 })
    chatDto.chatHistory = messages.map((message) =>
      plainToInstance(ChatMessageDto, message, { excludeExtraneousValues: true })
    )

    return chatDto
  }
  async createChat(userID: string, body: ChatCreateDto): Promise<ChatResponseDto> {
    const chat = plainToInstance(Chat, body, { excludeExtraneousValues: true })
    chat.setId(UuidGenerator.generateSocketRoomId(userID, body.peerUserId))
    chat.setCreatedAt(Date.now())
    chat.setUpdatedAt(Date.now())
    chat.firstUserId = userID
    chat.secondUserId = body.peerUserId
    const createdChat = await chatRepositoryImpl.create(chat)
    const chatDto = plainToInstance(ChatResponseDto, createdChat, { excludeExtraneousValues: true })
    const peerUser = await userRepositoryImpl.findById(body.peerUserId)
    chatDto.peerUser = plainToInstance(UserCreateDto, peerUser, { excludeExtraneousValues: true })
    return chatDto
  }
  async getUserChats(userId: string): Promise<ChatResponseDto[]> {
    const chats = await chatRepositoryImpl.findByUserId(userId)
    const chatDtos: ChatResponseDto[] = await Promise.all(
      chats.map(async (chat) => {
        const dto = plainToInstance(ChatResponseDto, chat, { excludeExtraneousValues: true })
        const peerUserId = chat.firstUserId === userId ? chat.secondUserId : chat.firstUserId
        const peerUser = await userRepositoryImpl.findById(peerUserId)
        dto.peerUser = plainToInstance(UserCreateDto, peerUser, { excludeExtraneousValues: true })
        return dto
      })
    )
    return chatDtos
  }
  async sendMessage(req: Request, messageDto: ChatMessageDto): Promise<void> {
    const message = plainToInstance(ChatMessage, messageDto, { excludeExtraneousValues: true })
    message.setId(UuidGenerator.generate())
    message.setCreatedAt(Date.now())
    message.setUpdatedAt(Date.now())
    message.isSeen = false

    const roomId = UuidGenerator.generateSocketRoomId(messageDto.senderId, messageDto.receiverId)

    let chat = await chatRepositoryImpl.findById(roomId)
    if (!chat) {
      chat = new Chat()
      chat.setId(roomId)
      chat.setCreatedAt(Date.now())
      chat.setUpdatedAt(Date.now())
      chat.lastMessage = message.content
      chat.firstUserId = messageDto.senderId
      chat.secondUserId = messageDto.receiverId
      await chatRepositoryImpl.create(chat)
    } else {
      chat.setUpdatedAt(Date.now())
      chat.lastMessage = message.content
      await chatRepositoryImpl.update(chat.getId(), chat)
    }

    message.chatId = chat.getId()
    const createdChat = await messageRepositoryImpl.create(message)

    const io = req.app.locals.io
    try {
      io.to(roomId).emit(
        'send-message',
        plainToInstance(ChatMessageDto, createdChat, { excludeExtraneousValues: true })
      )
    } catch (error) {
      console.error('Error emitting message:', error)
    }
  }
}

export default new ChatService()
