import User from '~/entities/user.entity'
import IRepository from './repository.interface'

export default interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>
  findByPhoneNumber(phoneNumber: string): Promise<User | null>
  findByUsername(username: string): Promise<User | null>
}
