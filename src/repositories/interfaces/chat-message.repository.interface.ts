import IRepository from './repository.interface'
import ChatMessage from '~/entities/message.entity'

export default interface IChatMessageRepository extends IRepository<ChatMessage> {}
