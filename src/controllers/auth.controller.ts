import { Request, Response } from 'express'
import authService from '../services/impls/auth-service.impl'
import CodeValidationDto from '~/dtos/code-validation.dto'
import { ApiResponse } from '~/dtos/api-response.dto'
import AccountSetupDto from '~/dtos/account-setup.dto'
import { OTPMethod } from '~/constants/entity-type.enum'
import EmailCodeValidationDto from '~/dtos/email-code-validation.dto'
import UsernameLoginDto from '~/dtos/username-login.dto'

class AuthController {
  async logout(req: Request, res: Response) {
    authService.logout(res)
    res.status(200).json(ApiResponse.builder().setCode(200).setMessage('Logout successfully').build())
  }
  async loginUsername(req: Request, res: Response) {
    const body: UsernameLoginDto = req.body
    const result = await authService.loginUsername(body)
    res.cookie('access_token', result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    })

    res.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res
      .status(200)
      .json(ApiResponse.builder().setCode(200).setData(result.user).setMessage('Login successfully').build())
  }
  async refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body
    const result = await authService.refreshToken(refreshToken)
    res
      .status(201)
      .json(ApiResponse.builder().setCode(201).setData(result).setMessage('Token refreshed successfully').build())
  }
  async validateEmailCode(req: Request, res: Response) {
    const body: EmailCodeValidationDto = req.body
    const result = await authService.validateEmailAccessCode(body)
    res.cookie('access_token', result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    })

    res.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res
      .status(201)
      .json(ApiResponse.builder().setCode(201).setData(result.user).setMessage('Valid code successfully').build())
  }
  async loginEmail(req: Request, res: Response) {
    const { email } = req.body
    const result = await authService.createNewAccessCode(email, OTPMethod.EMAIL)
    res
      .status(201)
      .json(
        ApiResponse.builder().setCode(201).setData(result).setMessage('New access code created successfully').build()
      )
  }
  async setupAccount(req: Request, res: Response) {
    const body: AccountSetupDto = req.body
    const id: string = req.params.id as string
    const result = await authService.setupAccount(id, body)
    res
      .status(201)
      .json(ApiResponse.builder().setCode(201).setData(result).setMessage('Account setup successfully').build())
  }
  async validateAccessCode(req: Request, res: Response) {
    const body: CodeValidationDto = req.body
    const result = await authService.validateAccessCode(body)

    res.cookie('access_token', result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    })

    res.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res
      .status(200)
      .json(ApiResponse.builder().setCode(200).setData(result.user).setMessage('Valid code successfully').build())
  }
  async createNewAccessCode(req: Request, res: Response) {
    const { phoneNumber } = req.body
    const result = await authService.createNewAccessCode(phoneNumber, OTPMethod.SMS)
    res
      .status(201)
      .json(
        ApiResponse.builder().setCode(201).setData(result).setMessage('New access code created successfully').build()
      )
  }
}
export default new AuthController()
