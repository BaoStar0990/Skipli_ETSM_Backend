import { BaseException } from './app-error.exception'

export class ForbiddenException extends BaseException {
  constructor(message = 'Forbidden') {
    super(message, 403, 'FORBIDDEN')
  }
}
