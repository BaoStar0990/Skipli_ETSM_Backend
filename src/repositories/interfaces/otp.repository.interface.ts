import IRepository from './repository.interface'
import Otp from '~/entities/otp.entity'

export default interface IOtpRepository extends IRepository<Otp> {
  findByPhoneNumber(phoneNumber: string): Promise<Otp | null>
  findByEmail(email: string): Promise<Otp | null>
}
