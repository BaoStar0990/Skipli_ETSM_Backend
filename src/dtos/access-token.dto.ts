import UserCreateDto from './user-create.dto'

export default class AccessTokenDto {
  accessToken!: string
  refreshToken?: string = undefined
  user!: UserCreateDto

  constructor(accessToken: string, refreshToken: string | undefined, user: UserCreateDto) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.user = user
  }
}
