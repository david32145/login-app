import { Response, Request, NextFunction } from 'express'
import JWTService from '../services/JWTService'
import ApiError from '../erros/ApiError'

class AuthMiddleware {
  public async handler (request: Request, response: Response, next: NextFunction): Promise<void | Response> {
    const authorization = request.headers.authorization
    if (!authorization) {
      return response.status(401).json({
        error: 'JWT_NOT_PROVIDED',
        type: 'INTERNAL',
        message: 'You must provide an header with name "Authorizantion" and the value as jwt token'
      })
    }

    const [type, token] = authorization.split(' ')
    if (type !== 'Bearer') {
      return response.status(401).json({
        error: 'JWT_TYPE_NOT_SUPPORTED',
        type: 'INTERNAL',
        message: 'Jwt type must be "Bearer"'
      })
    }

    if (!token) {
      return response.status(401).json({
        error: 'JWT_NOT_PROVIDED',
        type: 'INTERNAL',
        message: 'You must provide an jwt token',
        header_example: '{Authorization: "Bearer <token>"}'
      })
    }

    try {
      const payload = await JWTService.verify(token)
      request.user_id = payload.id
      return next()
    } catch (err) {
      if (err instanceof ApiError) {
        return response.status(401).json(err.toJSON())
      }
      return response.status(500).send()
    }
  }
}

export default new AuthMiddleware()
