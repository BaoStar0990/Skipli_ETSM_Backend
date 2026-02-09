import UserCreateDto from '~/dtos/user-create.dto'
import IUserService from '../interfaces/user-service.interface'
import userRepository from '~/repositories/impls/user.repository.impl'
import User from '~/entities/user.entity'
import { plainToInstance } from 'class-transformer'
import UuidGenerator from '~/utils/uuid-generator.util'
import sgMail from '~/config/mail.config'
import UserRole from '~/constants/user-role.enum'
import { NotFoundException } from '~/exceptions/not-found.exception'
import UsernameLoginDto from '~/dtos/username-login.dto'
import SecurityUtil from '~/utils/security.util'
import TaskDto from '~/dtos/task.dto'

class UserService implements IUserService {
  async confirmAccount(id: string, body: UsernameLoginDto): Promise<void> {
    const user = await userRepository.findById(id)
    if (!user) {
      throw new NotFoundException('Employee not found')
    }
    user.username = body.username
    user.password = await SecurityUtil.hashPassword(body.password)
    user.setUpdatedAt(Date.now())
    await userRepository.update(id, user)
  }
  async deleteEmployeeById(id: string): Promise<void> {
    const user: User | null = await userRepository.findById(id)
    if (!user) {
      throw new NotFoundException('Employee not found')
    }
    await userRepository.delete(id)
  }

  async updateEmployeeById(id: string, dto: UserCreateDto): Promise<void> {
    const user: User | null = await userRepository.findById(id)
    if (!user) {
      throw new NotFoundException('Employee not found')
    }
    if (dto.name) user.name = dto.name
    if (dto.email) user.email = dto.email
    if (dto.phoneNumber) user.phoneNumber = dto.phoneNumber
    if (dto.username) user.username = dto.username
    if (dto.password) user.password = await SecurityUtil.hashPassword(dto.password)
    user.setUpdatedAt(Date.now())

    await userRepository.update(id, user)
  }

  async getEmployeeById(id: string): Promise<UserCreateDto> {
    const user = await userRepository.findById(id)
    if (!user) {
      throw new NotFoundException('Employee not found')
    }
    return plainToInstance(UserCreateDto, user)
  }

  async getEmployees(page: number = 1, size: number = 10): Promise<UserCreateDto[]> {
    const users = await userRepository.findAll({ page, size })
    return users.map((user: User) => plainToInstance(UserCreateDto, user, { excludeExtraneousValues: true }))
  }

  async createEmployee(body: UserCreateDto): Promise<string> {
    if (body.role == UserRole.OWNER) {
      throw new NotFoundException('Cannot create employee with OWNER role')
    }
    const user: User = plainToInstance(User, body)
    const userId = UuidGenerator.generate()
    user.setId(userId)
    user.setCreatedAt(Date.now())
    user.setUpdatedAt(Date.now())
    await userRepository.create(user)

    try {
      await sgMail.send({
        to: user.email,
        from: process.env.SENDGRID_SENDER_EMAIL || '',
        subject: 'Welcome to the Company',
        text: `Hello ${user.name}, welcome to the company!`,
        html: `
          <strong>Hello ${user.name}, welcome to the company!</strong>
          Access your account setup here: <a href="${process.env.FRONTEND_URL}/setup-account/${userId}/confirmation">Setup Account</a>
        `
      })
    } catch (error) {
      console.error('Error sending welcome email:', error)
    }
    return user.getId()
  }
}

export default new UserService()
