import UserRole from '~/constants/user-role.enum'
import BaseEntity from './base.entity'

export default class User extends BaseEntity {
  name!: string
  email!: string
  phoneNumber!: string
  username: string | null = null
  password: string | null = null
  role!: UserRole

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password,
      username: this.username,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy
    }
  }
}
