import { NextFunction, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { UnauthorizedException } from '~/exceptions/unauthorized.exception'
import SecurityUtil from '~/utils/security.util'

export interface AuthRequest extends Request {
  user?: string | JwtPayload
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.access_token

  if (!token) {
    throw new UnauthorizedException('Access token not found')
  }

  try {
    const decoded = SecurityUtil.verifyAccessToken(token)
    req.user = decoded
    next()
  } catch (err) {
    throw new UnauthorizedException('Invalid or expired token')
  }
}

export default authMiddleware
