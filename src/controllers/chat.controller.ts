import { Request, Response } from 'express'
import ChatMessageDto from '~/dtos/chat-message.dto'
import chatService from '../services/impls/chat-service.impl'
import { ApiResponse } from '~/dtos/api-response.dto'

class ChatController {
  async getAllUserChats(req: Request, res: Response) {
    const userId = req.params.userId
    const chats = await chatService.getUserChats(userId as string)
    res
      .status(200)
      .json(ApiResponse.builder().setCode(200).setMessage('Chats retrieved successfully').setData(chats).build())
  }
  async sendMessage(req: Request, res: Response) {
    const body: ChatMessageDto = req.body
    await chatService.sendMessage(req, body)
    res.status(201).json(ApiResponse.builder().setCode(201).setMessage('Message sent successfully').build())
  }
}

export default new ChatController()
