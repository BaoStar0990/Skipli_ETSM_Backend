export abstract class BaseException extends Error {
  public readonly statusCode: number
  public readonly code: string
  public readonly isOperational: boolean = true

  protected constructor(message: string, statusCode: number, code: string) {
    super(message)
    this.statusCode = statusCode
    this.code = code

    Error.captureStackTrace(this, this.constructor)
  }
}
