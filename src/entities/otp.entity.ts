import { OTPMethod } from '~/constants/entity-type.enum'
import BaseEntity from './base.entity'

export default class Otp extends BaseEntity {
  otp!: string
  expiredAt!: number
  entityType!: OTPMethod
  entityValue!: string

  toJSON() {
    return {
      ...this
    }
  }
}
