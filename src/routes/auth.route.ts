import { Router } from 'express'
import authController from '~/controllers/auth.controller'

const authRouter = Router()

authRouter.post('/sms-login', authController.createNewAccessCode)
authRouter.post('/login', authController.loginUsername)
authRouter.post('/code-validation', authController.validateAccessCode)
authRouter.post('/email-login', authController.loginEmail)
authRouter.post('/email-code-validation', authController.validateEmailCode)
authRouter.post('/refresh-token', authController.refreshToken)

export default authRouter
