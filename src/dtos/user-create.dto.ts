import { Expose } from 'class-transformer'
import UserRole from '~/constants/user-role.enum'

export default class UserCreateDto {
  @Expose()
  id: string | null = null
  @Expose()
  name: string | null = null
  @Expose()
  email: string | null = null
  @Expose()
  phoneNumber: string | null = null
  @Expose()
  username: string | null = null
  password?: string | null
  @Expose()
  role!: UserRole

  toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phoneNumber: this.phoneNumber,
      username: this.username,
      password: this.password,
      role: this.role
    }
  }
}
