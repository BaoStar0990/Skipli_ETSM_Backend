import { BaseException } from './app-error.exception'

export class BadRequestException extends BaseException {
  constructor(message = 'Bad Request') {
    super(message, 400, 'BAD_REQUEST')
  }
}
