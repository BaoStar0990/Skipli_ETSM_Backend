import { Router } from 'express'
import chatController from '../controllers/chat.controller'

const chatRouter = Router()

chatRouter.post('/', chatController.sendMessage)
chatRouter.get('/:userId', chatController.getAllUserChats)

export default chatRouter
