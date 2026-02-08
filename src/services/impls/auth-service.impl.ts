import UuidGenerator from '~/utils/uuid-generator.util'
import IAuthService from '../interfaces/auth-service.interface'
import twilioClient from '~/config/twilio.config'
import { OTPMethod } from '~/constants/entity-type.enum'
import OtpRepository from '~/repositories/impls/otp.repository.impl'
import Otp from '~/entities/otp.entity'
import CodeValidationDto from '~/dtos/code-validation.dto'
import AccountSetupDto from '~/dtos/account-setup.dto'
import userRepository from '~/repositories/impls/user.repository.impl'
import sgMail from '~/config/mail.config'
import EmailCodeValidationDto from '~/dtos/email-code-validation.dto'
import AccessTokenDto from '~/dtos/access-token.dto'
import SecurityUtil from '~/utils/security.util'
import { plainToInstance } from 'class-transformer'
import UserCreateDto from '~/dtos/user-create.dto'
import { NotFoundException } from '~/exceptions/not-found.exception'
import { ForbiddenException } from '~/exceptions/forbidden.exception'
import UsernameLoginDto from '~/dtos/username-login.dto'

class AuthService implements IAuthService {
  async loginUsername(body: UsernameLoginDto): Promise<AccessTokenDto> {
    const user = await userRepository.findByUsername(body.username)
    if (!user) {
      throw new NotFoundException('User not found')
    } else {
      if (user.password && (await SecurityUtil.comparePassword(body.password, user.password))) {
        const userDto = plainToInstance(UserCreateDto, user, { excludeExtraneousValues: true })
        const accessToken = SecurityUtil.generateAccessToken(userDto)
        const refreshToken = SecurityUtil.generateRefreshToken(userDto)
        return new AccessTokenDto(accessToken, refreshToken, userDto)
      } else {
        throw new ForbiddenException('Invalid password')
      }
    }
  }
  async refreshToken(refreshToken: string): Promise<AccessTokenDto> {
    const payload = SecurityUtil.verifyRefreshToken(refreshToken)
    const userDto = plainToInstance(UserCreateDto, payload, { excludeExtraneousValues: true })
    const newAccessToken = SecurityUtil.generateAccessToken(userDto)
    return new AccessTokenDto(newAccessToken, undefined, userDto)
  }
  async validateEmailAccessCode(body: EmailCodeValidationDto) {
    const query = await OtpRepository.findByEmail(body.email)
    if (!query) {
      throw new NotFoundException('Invalid email')
    } else if (query.otp !== body.otp) {
      throw new NotFoundException('Invalid OTP code')
    } else if (query.expiredAt <= Date.now()) {
      throw new ForbiddenException('OTP code has expired')
    } else {
      query.otp = ''
      await OtpRepository.update(query.getId(), query)

      const user = await userRepository.findByEmail(body.email)
      if (!user) {
        throw new NotFoundException('User not found')
      }
      const userDto = plainToInstance(UserCreateDto, user, { excludeExtraneousValues: true })
      const accessToken = SecurityUtil.generateAccessToken(userDto)
      const refreshToken = SecurityUtil.generateRefreshToken(userDto)
      return new AccessTokenDto(accessToken, refreshToken, userDto)
    }
  }
  async setupAccount(id: string, body: AccountSetupDto) {
    const query = await userRepository.findById(id)
    if (!query) {
      throw new NotFoundException('User not found')
    }
    query.password = body.password
    query.username = body.userName
    query.setUpdatedAt(Date.now())
    await userRepository.update(id, query)
  }

  async validateAccessCode(body: CodeValidationDto) {
    const query = await OtpRepository.findByPhoneNumber(body.phoneNumber)
    if (!query) {
      throw new NotFoundException('Invalid phone number')
    } else if (query.otp !== body.otp) {
      throw new NotFoundException('Invalid OTP code')
    } else if (query.expiredAt <= Date.now()) {
      throw new ForbiddenException('OTP code has expired')
    } else {
      query.otp = ''
      await OtpRepository.update(query.getId(), query)

      const user = await userRepository.findByPhoneNumber(body.phoneNumber)
      if (!user) {
        throw new NotFoundException('User not found')
      }

      const userDto = plainToInstance(UserCreateDto, user, { excludeExtraneousValues: true })

      const accessToken = SecurityUtil.generateAccessToken(userDto)
      const refreshToken = SecurityUtil.generateRefreshToken(userDto)

      return new AccessTokenDto(accessToken, refreshToken, userDto)
    }
  }

  async createNewAccessCode(value: string, otpMethod: OTPMethod): Promise<string> {
    const otp = UuidGenerator.generateOtp()

    let smsOtp = new Otp()

    let query: Otp | null = null

    switch (otpMethod) {
      case OTPMethod.SMS:
        query = await OtpRepository.findByPhoneNumber(value)
        break
      case OTPMethod.EMAIL:
        query = await OtpRepository.findByEmail(value)
        break
    }
    if (!query) {
      smsOtp.setId(UuidGenerator.generate())
      smsOtp.setCreatedAt(Date.now())
      smsOtp.setUpdatedAt(Date.now())
      smsOtp.entityType = otpMethod
      smsOtp.entityValue = value
      switch (otpMethod) {
        case OTPMethod.SMS:
          smsOtp.entityType = OTPMethod.SMS
          break
        case OTPMethod.EMAIL:
          smsOtp.entityType = OTPMethod.EMAIL
          break
      }
      smsOtp.otp = otp
      smsOtp.expiredAt = Date.now() + 2 * 60 * 1000
      await OtpRepository.create(smsOtp)
    } else {
      smsOtp = query
      smsOtp.otp = otp
      smsOtp.expiredAt = Date.now() + 2 * 60 * 1000
      smsOtp.setUpdatedAt(Date.now())
      await OtpRepository.update(smsOtp.getId(), smsOtp)
    }

    await this.sendSmsOtp(value, otp, otpMethod)

    return otp
  }

  private async sendSmsOtp(value: string, otp: string, otpMethod: OTPMethod) {
    switch (otpMethod) {
      case OTPMethod.EMAIL:
        try {
          await sgMail.send({
            to: value,
            from: process.env.SENDGRID_SENDER_EMAIL || '',
            subject: 'Welcome to the Company',
            text: `This is your ETSM OTP code: ${otp}`,
            html: `This is your ETSM OTP code: <strong>${otp}</strong>`
          })
        } catch (error) {
          console.error('Error sending welcome email:', error)
          throw new Error('Failed to send access code')
        }
        break
      case OTPMethod.SMS:
        try {
          await twilioClient.messages.create({
            body: `This is your ETSM OTP code: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: value
          })
        } catch (error) {
          console.error('Error sending SMS:', error)
          throw new Error('Failed to send access code')
        }
        break
    }
  }
}

export default new AuthService()
