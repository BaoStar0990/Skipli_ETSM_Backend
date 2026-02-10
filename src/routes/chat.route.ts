import { Router } from 'express'
import chatController from '../controllers/chat.controller'

const chatRouter = Router()

chatRouter.post('/send', chatController.sendMessage)
chatRouter.post('/', chatController.createChat)
chatRouter.get('/users/:userId', chatController.getAllUserChats)
chatRouter.get('/:id', chatController.getChatById)

export default chatRouter
