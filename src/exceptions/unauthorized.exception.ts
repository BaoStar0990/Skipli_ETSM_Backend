import { BaseException } from './app-error.exception'

export class UnauthorizedException extends BaseException {
  constructor(message = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED')
  }
}
