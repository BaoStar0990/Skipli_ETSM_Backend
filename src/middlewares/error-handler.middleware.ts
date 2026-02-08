import { NextFunction, Request, Response } from 'express'
import { ApiResponse } from '~/dtos/api-response.dto'
import { BaseException } from '~/exceptions/app-error.exception'

const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BaseException) {
    return res.status(err.statusCode).json({
      code: err.statusCode,
      message: err.message
    })
  }

  res.status(500).json(ApiResponse.builder().setCode(500).setMessage(err.message).build())
}

export default errorHandlerMiddleware
