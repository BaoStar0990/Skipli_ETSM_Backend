import jwt from 'jsonwebtoken'
import UserCreateDto from '~/dtos/user-create.dto'
import bcrypt from 'bcrypt'

export default class SecurityUtil {
  static verifyRefreshToken(refreshToken: string) {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string)
    return payload
  }
  static verifyAccessToken(accessToken: string) {
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string)
    return payload
  }
  static generateAccessToken(payload: UserCreateDto) {
    return jwt.sign(payload.toJson(), process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as string
    })
  }

  static generateRefreshToken(payload: UserCreateDto) {
    return jwt.sign(payload.toJson(), process.env.REFRESH_TOKEN_SECRET as string, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as string
    })
  }

  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
  }
}
