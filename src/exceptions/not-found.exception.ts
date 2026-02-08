import { BaseException } from './app-error.exception'

export class NotFoundException extends BaseException {
  constructor(message = 'Not Found') {
    super(message, 404, 'NOT_FOUND')
  }
}
