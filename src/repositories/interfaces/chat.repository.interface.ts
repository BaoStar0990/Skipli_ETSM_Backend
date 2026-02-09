import Chat from '~/entities/chat.entity'
import IRepository from './repository.interface'

export default interface IChatRepository extends IRepository<Chat> {
  findByUserId(userId: string): Promise<Chat[]>
}
