import { OTPMethod } from '~/constants/entity-type.enum'
import AccessTokenDto from '~/dtos/access-token.dto'
import AccountSetupDto from '~/dtos/account-setup.dto'
import CodeValidationDto from '~/dtos/code-validation.dto'
import EmailCodeValidationDto from '~/dtos/email-code-validation.dto'
import UsernameLoginDto from '~/dtos/username-login.dto'

export default interface IAuthService {
  createNewAccessCode(value: string, otpMethod: OTPMethod): Promise<string>
  validateAccessCode(body: CodeValidationDto): Promise<AccessTokenDto>
  setupAccount(id: string, body: AccountSetupDto): Promise<void>
  validateEmailAccessCode(body: EmailCodeValidationDto): Promise<AccessTokenDto>
  refreshToken(refreshToken: string): Promise<AccessTokenDto>
  loginUsername(body: UsernameLoginDto): Promise<AccessTokenDto>
}
