import { v4 } from 'uuid'
export default class UuidGenerator {
  static generate(): string {
    return v4()
  }
  static generateOtp(length: number = 6): string {
    const min = Math.pow(10, length - 1)
    const max = Math.pow(10, length) - 1
    return Math.floor(min + Math.random() * (max - min + 1)).toString()
  }
  static generateSocketRoomId(userId1: string, userId2: string): string {
    return [userId1, userId2].sort().join('_')
  }
}
